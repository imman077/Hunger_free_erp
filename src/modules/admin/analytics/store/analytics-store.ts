import { create } from "zustand";
import type {
  ImpactMetric,
  DonationTrend,
  CategoryData,
} from "./analytics-schemas";

interface AnalyticsStore {
  impactMetrics: ImpactMetric[];
  donationTrends: DonationTrend[];
  categoryData: CategoryData[];

  // Actions
  setImpactMetrics: (metrics: ImpactMetric[]) => void;
  setDonationTrends: (trends: DonationTrend[]) => void;
  setCategoryData: (data: CategoryData[]) => void;
}

const initialImpactMetrics: ImpactMetric[] = [
  {
    label: "Total Donations",
    val: "1,248",
    trend: "+18% from last month",
    color: "bg-[#22c55e]",
  },
  {
    label: "Meals Distributed",
    val: "8,420",
    trend: "Across 24 NGOs",
    color: "bg-emerald-500",
  },
  {
    label: "Active Volunteers",
    val: "156",
    trend: "+12 this week",
    color: "bg-blue-500",
  },
  {
    label: "Partner NGOs",
    val: "24",
    trend: "3 pending approval",
    color: "bg-amber-500",
  },
];

const initialDonationTrends: DonationTrend[] = [
  { day: "Mon", donations: 12, distributed: 10 },
  { day: "Tue", donations: 18, distributed: 15 },
  { day: "Wed", donations: 15, distributed: 14 },
  { day: "Thu", donations: 22, distributed: 20 },
  { day: "Fri", donations: 28, distributed: 25 },
  { day: "Sat", donations: 35, distributed: 32 },
  { day: "Sun", donations: 20, distributed: 18 },
];

const initialCategoryData: CategoryData[] = [
  { name: "Cooked Food", value: 40, color: "#22c55e" },
  { name: "Fresh Produce", value: 25, color: "#3b82f6" },
  { name: "Packaged Items", value: 20, color: "#f59e0b" },
  { name: "Beverages", value: 15, color: "#8b5cf6" },
];

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  impactMetrics: initialImpactMetrics,
  donationTrends: initialDonationTrends,
  categoryData: initialCategoryData,

  setImpactMetrics: (impactMetrics) => set({ impactMetrics }),
  setDonationTrends: (donationTrends) => set({ donationTrends }),
  setCategoryData: (categoryData) => set({ categoryData }),
}));
