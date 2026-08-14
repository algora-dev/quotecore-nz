export type PricingPlan = {
  name: string;
  displayName: string;
  nzd: string;
  schemaPriceNzd: number;
  originalNzd: string | null;
  subtitle: string;
  features: string[];
  featured: boolean;
  comingSoon: boolean;
  isFree: boolean;
  includeInSchema: boolean;
  contactUs?: boolean;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Full trial",
    displayName: "Full trial",
    nzd: "14 Days Free",
    schemaPriceNzd: 0,
    originalNzd: null,
    subtitle: "A 14-day taste of everything",
    features: ["10 quotes", "100 MB storage", "All features unlocked", "No credit card needed"],
    featured: false,
    comingSoon: false,
    isFree: true,
    includeInSchema: true,
  },
  {
    name: "Lite",
    displayName: "Lite",
    nzd: "Free",
    schemaPriceNzd: 0,
    originalNzd: null,
    subtitle: "For individuals just getting started",
    features: ["5 quotes", "50 MB storage"],
    featured: false,
    comingSoon: false,
    isFree: true,
    includeInSchema: true,
  },
  {
    name: "Starter",
    displayName: "Starter",
    nzd: "$29",
    schemaPriceNzd: 29,
    originalNzd: "$60",
    subtitle: "For owner-operators and solo tradies",
    features: ["25 quotes", "500 MB storage", "All core features", "No card for trial"],
    featured: false,
    comingSoon: false,
    isFree: false,
    includeInSchema: true,
  },
  {
    name: "Professional",
    displayName: "Professional",
    nzd: "$59",
    schemaPriceNzd: 59,
    originalNzd: "$110",
    subtitle: "For growing trade businesses",
    features: ["100 quotes", "3 GB storage", "All core features", "Priority support"],
    featured: true,
    comingSoon: false,
    isFree: false,
    includeInSchema: true,
  },
  {
    name: "Pro Plus",
    displayName: "Pro Plus",
    nzd: "$99",
    schemaPriceNzd: 99,
    originalNzd: "$180",
    subtitle: "For established teams with high quote volume",
    features: ["200 quotes", "5 GB storage", "All core features", "Priority support"],
    featured: false,
    comingSoon: false,
    isFree: false,
    includeInSchema: true,
  },
  {
    name: "Premium",
    displayName: "Premium",
    nzd: "Coming Soon",
    schemaPriceNzd: 0,
    originalNzd: null,
    subtitle: "Enterprise-level power for larger operations",
    features: ["Higher limits", "Advanced features", "Dedicated support"],
    featured: false,
    comingSoon: true,
    isFree: false,
    includeInSchema: false,
  },
];

export const schemaPricingPlans = pricingPlans.filter((plan) => plan.includeInSchema);
