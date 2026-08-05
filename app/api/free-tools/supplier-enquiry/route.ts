import { NextResponse } from 'next/server';
import { submitSupplierEnquiry, uploadEnquiryFile, type SupplierEnquiryInput } from '@/app/lib/supplier-pricing/supplierEnquiry';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input: SupplierEnquiryInput = {
      supplierSlug: body.supplierSlug,
      senderName: body.senderName,
      senderEmail: body.senderEmail,
      senderPhone: body.senderPhone,
      intent: body.intent,
      message: body.message || '',
      includeQuantities: body.includeQuantities ?? true,
      includePricing: body.includePricing ?? true,
      includeResultLink: body.includeResultLink ?? true,
      resultToken: body.resultToken,
      resultUrl: body.resultUrl,
      totals: body.totals,
      currency: body.currency,
      marketingConsent: body.marketingConsent ?? false,
      attachmentIds: body.attachmentIds,
    };

    const result = await submitSupplierEnquiry(input);

    if (result.ok) {
      return NextResponse.json({ ok: true, enquiryId: result.enquiryId });
    } else {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }
  } catch (err: any) {
    console.error('[supplier-enquiry] Error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to submit enquiry' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  // File upload endpoint
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadEnquiryFile(file.name, buffer, file.type);

    if (result.ok) {
      return NextResponse.json({ ok: true, fileId: result.fileId });
    } else {
      return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
    }
  } catch (err: any) {
    console.error('[supplier-enquiry-upload] Error:', err);
    return NextResponse.json({ ok: false, error: 'Failed to upload file' }, { status: 500 });
  }
}
