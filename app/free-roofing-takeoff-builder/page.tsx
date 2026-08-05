import { RoofTakeoffBuilder } from './RoofTakeoffBuilder';

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const supplied = await searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(supplied)) {
    if (typeof value === 'string') params.set(key, value);
    else if (Array.isArray(value)) params.set(key, value.join(','));
  }
  // For now, no public-contract query parsing (NZ doesn't have the GET calculate route)
  // This can be added later if needed
  return <RoofTakeoffBuilder />;
}
