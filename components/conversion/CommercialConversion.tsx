import ConversionPanel, { ConversionActionGroup } from "@/components/conversion/ConversionPanel";
import { workflowCallHref } from "@/lib/booking";
import { homepageConfig } from "@/components/marketing/home/homepage-config";

const SHARED_DEMO_HREF = homepageConfig.demoHref;

export function CommercialHeroActions({ location }: { location: string }) {
  return (
    <ConversionActionGroup
      location={location}
      surface="commercial_hero_actions"
      className="mt-10"
      actions={[
        { href: SHARED_DEMO_HREF, label: "Explore the interactive demo", style: "primary", analyticsAction: "demo" },
        { href: workflowCallHref, label: "Book a free 20-minute call", style: "secondary", analyticsAction: "book_call" },
        { href: "/pricing", label: "See pricing", style: "text", analyticsAction: "pricing" },
      ]}
    />
  );
}

export function CommercialFinalCta({ location, title, body }: { location: string; title: string; body: string }) {
  return (
    <ConversionPanel
      location={location}
      surface="commercial_final_cta"
      eyebrow="Choose your next step"
      title={title}
      body={body}
      actions={[
        { href: SHARED_DEMO_HREF, label: "Explore the interactive demo", style: "primary", analyticsAction: "demo" },
        { href: workflowCallHref, label: "Book a free 20-minute workflow call", style: "secondary", analyticsAction: "book_call" },
        { href: "/pricing", label: "See current pricing", style: "text", analyticsAction: "pricing" },
      ]}
      footer={<>Prefer to start without signing up? <a href="/free-tools" className="font-medium text-zinc-700 underline underline-offset-4" data-analytics-action="free_tools">Use the free tools.</a> Want help configuring it? <a href="/done-for-you-setup" className="font-medium text-zinc-700 underline underline-offset-4" data-analytics-action="done_for_you">See Done For You setup.</a></>}
    />
  );
}
