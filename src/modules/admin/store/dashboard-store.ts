import { create } from "zustand";
import { DashboardDataSchema } from "./dashboard-schemas";
import type { DashboardData } from "./dashboard-schemas";

interface DashboardState {
  data: DashboardData;
  isLoading: boolean;
  error: string | null;

  // Actions
  setDashboardData: (data: DashboardData) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Potential future action for fetching data
  // fetchDashboardData: () => Promise<void>;
}

// Initial mock data based on existing Dashboard.tsx
const initialData: DashboardData = {
  stats: [
    {
      title: "Total Donations",
      value: "1.2K",
      change: "+15% from last month",
      changeColor: "text-green-600",
    },
    {
      title: "Active Users",
      value: "542",
      change: "+8% from last week",
      changeColor: "text-green-600",
    },
    {
      title: "NGO Partners",
      value: "68",
      change: "+2 new this month",
      changeColor: "text-green-600",
    },
    {
      title: "Volunteers Onboarded",
      value: "210",
      change: "-3% from last month",
      changeColor: "text-red-600",
    },
  ],
};

export const useDashboardStore = create<DashboardState>((set) => ({
  data: initialData,
  isLoading: false,
  error: null,

  setDashboardData: (newData) => {
    // Validate with Zod before setting state
    const result = DashboardDataSchema.safeParse(newData);
    if (result.success) {
      set({ data: result.data });
    } else {
      console.error("Dashboard store validation failed:", result.error);
      set({ error: "Invalid data format received" });
    }
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
