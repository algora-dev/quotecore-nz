import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY;

function getSupabase() {
  return createClient(supabaseUrl, supabaseKey);
}

export interface SupplierEnquiryInput {
  supplierSlug: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  intent: 'detailed_quote' | 'order_request' | 'pricing_question' | 'general_enquiry';
  message: string;
  includeQuantities: boolean;
  includePricing: boolean;
  includeResultLink: boolean;
  resultToken?: string;
  resultUrl?: string;
  totals?: Record<string, any>;
  currency?: string;
  marketingConsent: boolean;
  attachmentIds?: string[];
}

export interface SupplierEnquiryResult {
  ok: boolean;
  enquiryId?: string;
  error?: string;
}

export async function submitSupplierEnquiry(
  input: SupplierEnquiryInput,
): Promise<SupplierEnquiryResult> {
  const sb = getSupabase();

  // 1. Load supplier profile
  const { data: supplier, error: supError } = await sb
    .from('supplier_profiles')
    .select('id, supplier_name, slug, enquiry_email, enquiries_enabled, country, currency')
    .eq('slug', input.supplierSlug)
    .eq('status', 'approved')
    .single();

  if (supError || !supplier) {
    return { ok: false, error: 'Supplier not found or not approved' };
  }

  if (!supplier.enquiries_enabled || !supplier.enquiry_email) {
    return { ok: false, error: 'This supplier is not accepting enquiries' };
  }

  // 2. Insert enquiry record
  const { data: enquiry, error: enquiryError } = await sb
    .from('supplier_takeoff_enquiries')
    .insert({
      supplier_profile_id: supplier.id,
      sender_name: input.senderName,
      sender_email: input.senderEmail,
      sender_phone: input.senderPhone || null,
      intent: input.intent,
      message: input.message,
      include_quantities: input.includeQuantities,
      include_pricing: input.includePricing,
      include_result_link: input.includeResultLink,
      include_files: (input.attachmentIds?.length ?? 0) > 0,
      result_token: input.resultToken || null,
      canonical_url: input.resultUrl || null,
      totals: input.totals || null,
      currency: input.currency || supplier.currency,
      marketing_consent: input.marketingConsent,
      consent_version: 'v1',
      delivery_status: 'pending',
    })
    .select('id')
    .single();

  if (enquiryError || !enquiry) {
    console.error('[supplier-enquiry] Failed to create enquiry:', enquiryError);
    return { ok: false, error: 'Failed to create enquiry record' };
  }

  const enquiryId = enquiry.id;

  // 3. Link uploaded files + load attachments
  let attachmentPayloads: { filename: string; content: string }[] = [];
  if (input.attachmentIds && input.attachmentIds.length > 0) {
    await sb
      .from('supplier_takeoff_enquiry_files')
      .update({ enquiry_id: enquiryId })
      .in('id', input.attachmentIds);

    const { data: files } = await sb
      .from('supplier_takeoff_enquiry_files')
      .select('filename, storage_path, content_type, size_bytes')
      .in('id', input.attachmentIds);

    if (files && files.length > 0) {
      for (const file of files) {
        try {
          const { data: fileData } = await sb.storage
            .from('supplier-enquiry-files')
            .download(file.storage_path);

          if (fileData) {
            const buf = Buffer.from(await fileData.arrayBuffer());
            attachmentPayloads.push({
              filename: file.filename,
              content: buf.toString('base64'),
            });
          }
        } catch (err) {
          console.error('[supplier-enquiry] Failed to load attachment:', err);
        }
      }
    }
  }

  // 4. Build email content
  const intentLabels: Record<string, string> = {
    detailed_quote: 'Request for Detailed Quote',
    order_request: 'Order Request',
    pricing_question: 'Pricing Question',
    general_enquiry: 'General Enquiry',
  };

  const subject = `${intentLabels[input.intent] || 'Enquiry'} from ${input.senderName} via Quote Core+`;

  const cur = input.currency || '';
  const grandMaterial = input.totals
    ? Object.values(input.totals).reduce((s, v: any) => s + (v.materialCost || 0), 0)
    : 0;
  const grandLabour = input.totals
    ? Object.values(input.totals).reduce((s, v: any) => s + (v.labourCost || 0), 0)
    : 0;
  const grandTotal = grandMaterial + grandLabour;

  const totalsRows = input.totals
    ? Object.entries(input.totals)
        .filter(([_, val]) => typeof val === 'object' && val !== null && (val as any).count > 0)
        .map(([key, val]) => {
          const v = val as any;
          const label = v.label || key;
          const unit = v.unit || '';
          const raw = v.rawTotal != null ? Number(v.rawTotal).toFixed(2) : '-';
          const waste = v.withWaste != null ? Number(v.withWaste).toFixed(2) : '-';
          const wastePct = v.wastePercent || 0;
          const material = v.materialCost != null ? Number(v.materialCost).toFixed(2) : '0.00';
          const entriesHtml = (v.entries || []).map((entry: any) => {
            const priceStr = entry.pricePerUnit != null ? `${cur}${Number(entry.pricePerUnit).toFixed(2)}/${unit}` : '';
            const skuStr = entry.componentSku ? ` SKU: ${escapeHtml(entry.componentSku)}` : '';
            return `<div style="font-size:11px;color:#64748b;padding:2px 0 2px 16px;border-left:2px solid #e2e8f0;margin-left:4px;">${escapeHtml(entry.componentName)}${skuStr}${priceStr ? ` &middot; ${priceStr}` : ''} &middot; Qty: ${entry.quantity} &middot; ${entry.rawValue} ${unit}</div>`;
          }).join('');
          return `<tr>
            <td style="padding:8px 12px 8px 0;font-weight:600;color:#1e293b;border-bottom:1px solid #f1f5f9;vertical-align:top;">${escapeHtml(label)}${entriesHtml ? `<div style="margin-top:4px;">${entriesHtml}</div>` : ''}</td>
            <td style="padding:8px 12px 8px 0;color:#64748b;border-bottom:1px solid #f1f5f9;text-align:right;vertical-align:top;">${raw} ${unit}</td>
            <td style="padding:8px 12px 8px 0;color:#64748b;border-bottom:1px solid #f1f5f9;text-align:right;vertical-align:top;">+${wastePct}% = ${waste} ${unit}</td>
            <td style="padding:8px 0;color:#1e293b;border-bottom:1px solid #f1f5f9;text-align:right;font-weight:500;vertical-align:top;">${cur}${material}</td>
          </tr>`;
        })
        .join('')
    : '';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${subject}</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="background:#0f172a;padding:20px 24px;">
        <h1 style="margin:0;color:#fff;font-size:18px;font-weight:600;">New enquiry from Quote Core+</h1>
        <p style="margin:4px 0 0;color:#94a3b8;font-size:13px;">${supplier.supplier_name} - Roof Takeoff Enquiry</p>
      </div>
      <div style="padding:24px;">
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
          <tr><td style="padding:4px 12px 4px 0;color:#64748b;width:120px;">From:</td><td style="padding:4px 0;font-weight:500;">${escapeHtml(input.senderName)}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#64748b;">Email:</td><td style="padding:4px 0;"><a href="mailto:${escapeHtml(input.senderEmail)}" style="color:#FF6B35;text-decoration:none;">${escapeHtml(input.senderEmail)}</a></td></tr>
          ${input.senderPhone ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b;">Phone:</td><td style="padding:4px 0;">${escapeHtml(input.senderPhone)}</td></tr>` : ''}
          <tr><td style="padding:4px 12px 4px 0;color:#64748b;">Intent:</td><td style="padding:4px 0;">${intentLabels[input.intent] || input.intent}</td></tr>
          ${input.currency ? `<tr><td style="padding:4px 12px 4px 0;color:#64748b;">Currency:</td><td style="padding:4px 0;">${input.currency}</td></tr>` : ''}
        </table>
        ${input.message ? `<div style="margin:20px 0;"><h3 style="margin:0 0 8px;font-size:14px;color:#475569;">Message:</h3><div style="background:#f8fafc;border-radius:8px;padding:12px 16px;font-size:14px;line-height:1.6;color:#334155;white-space:pre-wrap;">${escapeHtml(input.message)}</div></div>` : ''}
        ${totalsRows && input.includeQuantities ? `<div style="margin:20px 0;"><h3 style="margin:0 0 8px;font-size:14px;color:#475569;">Takeoff Breakdown:</h3><table style="width:100%;border-collapse:collapse;font-size:13px;"><thead><tr style="border-bottom:2px solid #e2e8f0;"><th style="padding:6px 12px 6px 0;text-align:left;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Component</th><th style="padding:6px 12px 6px 0;text-align:right;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Raw Qty</th><th style="padding:6px 12px 6px 0;text-align:right;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">With Waste</th><th style="padding:6px 0;text-align:right;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Material</th></tr></thead><tbody>${totalsRows}</tbody><tfoot><tr style="border-top:2px solid #e2e8f0;"><td colspan="3" style="padding:8px 12px 8px 0;font-weight:600;color:#1e293b;text-align:right;">Total Materials:</td><td style="padding:8px 0;font-weight:700;color:#1e293b;text-align:right;">${cur}${grandMaterial.toFixed(2)}</td></tr>${grandLabour > 0 ? `<tr><td colspan="3" style="padding:4px 12px 4px 0;font-weight:600;color:#1e293b;text-align:right;">Total Labour:</td><td style="padding:4px 0;font-weight:700;color:#1e293b;text-align:right;">${cur}${grandLabour.toFixed(2)}</td></tr>` : ''}<tr><td colspan="3" style="padding:8px 12px 8px 0;font-weight:700;color:#0f172a;text-align:right;font-size:14px;">Grand Total:</td><td style="padding:8px 0;font-weight:700;color:#0f172a;text-align:right;font-size:14px;">${cur}${grandTotal.toFixed(2)}</td></tr></tfoot></table></div>` : ''}
        ${input.resultUrl && input.includeResultLink ? `<div style="margin:20px 0;"><h3 style="margin:0 0 8px;font-size:14px;color:#475569;">Takeoff Result:</h3><a href="${escapeHtml(input.resultUrl)}" style="display:inline-block;background:#FF6B35;color:#fff;text-decoration:none;padding:10px 20px;border-radius:9999px;font-size:13px;font-weight:500;">View Full Takeoff Result</a></div>` : ''}
        ${attachmentPayloads.length > 0 ? `<div style="margin:20px 0;"><h3 style="margin:0 0 8px;font-size:14px;color:#475569;">Attachments (${attachmentPayloads.length}):</h3><p style="font-size:13px;color:#64748b;">See attached files with this email.</p></div>` : ''}
        <div style="margin:24px 0 0;padding-top:16px;border-top:1px solid #e2e8f0;">
          <p style="margin:0;font-size:12px;color:#94a3b8;">This enquiry was submitted via Quote Core+ free roof takeoff builder. ${input.marketingConsent ? 'The sender has opted in to receive marketing communications.' : 'The sender has not opted in to marketing communications.'}</p>
          <p style="margin:8px 0 0;font-size:12px;color:#94a3b8;">Reply directly to this email to respond to ${escapeHtml(input.senderName)} at ${escapeHtml(input.senderEmail)}.</p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`.trim();

  const text = `New enquiry from Quote Core+\n\nSupplier: ${supplier.supplier_name}\nFrom: ${input.senderName} <${input.senderEmail}>\n${input.senderPhone ? `Phone: ${input.senderPhone}\n` : ''}Intent: ${intentLabels[input.intent] || input.intent}\n${input.currency ? `Currency: ${input.currency}\n` : ''}\nMessage:\n${input.message || '(no message)'}\n\n${input.includeResultLink && input.resultUrl ? `Takeoff Result: ${input.resultUrl}\n` : ''}${attachmentPayloads.length > 0 ? `Attachments: ${attachmentPayloads.length} file(s)\n` : ''}\n---\nThis enquiry was submitted via Quote Core+ free roof takeoff builder.\nReply directly to this email to respond to ${input.senderName} at ${input.senderEmail}.`.trim();

  // 5. Send email via Resend
  if (!RESEND_API_KEY) {
    console.error('[supplier-enquiry] RESEND_API_KEY not configured');
    await sb.from('supplier_takeoff_enquiries').update({ delivery_status: 'failed', provider_error: 'RESEND_API_KEY not configured' }).eq('id', enquiryId);
    return { ok: false, error: 'Email service not configured', enquiryId };
  }

  try {
    const emailBody: any = {
      from: `"${input.senderName} via Quote Core+" <noreply@quote-core.com>`,
      to: supplier.enquiry_email,
      reply_to: input.senderEmail,
      subject,
      html,
      text,
    };

    if (attachmentPayloads.length > 0) {
      emailBody.attachments = attachmentPayloads;
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailBody),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[supplier-enquiry] Resend error:', res.status, errText);
      await sb.from('supplier_takeoff_enquiries').update({ delivery_status: 'failed', provider_error: errText }).eq('id', enquiryId);
      return { ok: false, error: `Email send failed: ${res.status}`, enquiryId };
    }

    const result = await res.json();

    await sb.from('supplier_takeoff_enquiries').update({
      delivery_status: 'sent',
      provider_id: result.id,
      sent_at: new Date().toISOString(),
    }).eq('id', enquiryId);

    return { ok: true, enquiryId };
  } catch (err: any) {
    console.error('[supplier-enquiry] Error sending email:', err);
    await sb.from('supplier_takeoff_enquiries').update({ delivery_status: 'failed', provider_error: err.message }).eq('id', enquiryId);
    return { ok: false, error: err.message, enquiryId };
  }
}

export async function uploadEnquiryFile(
  fileName: string,
  fileContent: Buffer,
  contentType: string,
): Promise<{ ok: boolean; fileId?: string; error?: string }> {
  const sb = getSupabase();

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(contentType)) {
    return { ok: false, error: 'File type not allowed. Accepted: PDF, JPG, PNG, WebP.' };
  }

  const maxSize = 10 * 1024 * 1024;
  if (fileContent.length > maxSize) {
    return { ok: false, error: 'File exceeds 10MB limit.' };
  }

  const storagePath = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${fileName}`;
  const { error: uploadError } = await sb.storage
    .from('supplier-enquiry-files')
    .upload(storagePath, fileContent, { contentType, upsert: false });

  if (uploadError) {
    return { ok: false, error: 'Failed to upload file' };
  }

  const { data: fileRecord, error: dbError } = await sb
    .from('supplier_takeoff_enquiry_files')
    .insert({
      enquiry_id: null,
      filename: fileName,
      storage_path: storagePath,
      content_type: contentType,
      size_bytes: fileContent.length,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    })
    .select('id')
    .single();

  if (dbError || !fileRecord) {
    await sb.storage.from('supplier-enquiry-files').remove([storagePath]);
    return { ok: false, error: 'Failed to create file record' };
  }

  return { ok: true, fileId: fileRecord.id };
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
