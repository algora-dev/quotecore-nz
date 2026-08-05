import { NextResponse } from 'next/server';
import { loadPublishedTakeoffLibrary, loadPublishedTakeoffLibraryBySlug } from '@/app/lib/supplier-pricing/publishedTakeoffLibrary';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  try {
    const library = await loadPublishedTakeoffLibraryBySlug(slug);

    if (!library) {
      return NextResponse.json({ error: 'Supplier library not found' }, { status: 404 });
    }

    return NextResponse.json({
      supplierId: library.supplierId,
      supplierName: library.supplierName,
      supplierSlug: library.supplierSlug,
      supplierCountry: library.supplierCountry,
      collectionId: library.collectionId,
      collectionName: library.collectionName,
      currency: library.currency,
      unitSystem: library.unitSystem,
      enquiriesEnabled: library.enquiriesEnabled,
      enquiryEmail: library.enquiryEmail,
      components: library.components,
      slotMap: library.slotMap,
      slotOptions: library.slotOptions,
    }, {
      headers: { 'Cache-Control': 'public, max-age=300, s-maxage=600' },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load supplier library' }, { status: 500 });
  }
}
