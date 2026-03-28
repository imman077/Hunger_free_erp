import { create } from "zustand";
import type {
  RewardConfig,
  Redemption,
  RewardCatalog,
} from "./rewards-schemas";

interface RewardsStore {
  catalog: RewardCatalog;
  redemptions: Redemption[];

  // Actions
  setCatalog: (catalog: RewardCatalog) => void;
  addReward: (category: keyof RewardCatalog, reward: RewardConfig) => void;
  updateReward: (
    category: keyof RewardCatalog,
    id: string | number,
    updates: Partial<RewardConfig>,
  ) => void;
  toggleRewardActive: (
    category: keyof RewardCatalog,
    id: string | number,
  ) => void;
  deleteReward: (category: keyof RewardCatalog, id: string | number) => void;
  setRedemptions: (redemptions: Redemption[]) => void;
  approveRedemption: (id: string) => void;
  rejectRedemption: (id: string) => void;
}

const INITIAL_CATALOG: RewardCatalog = {
  donor: [
    {
      id: 1,
      name: "Quick Cash",
      val: "₹1,000",
      pts: 600,
      active: true,
      tag: "Cash",
    },
    {
      id: 2,
      name: "Cash Bonus",
      val: "₹2,500",
      pts: 1200,
      active: true,
      tag: "Cash",
    },
  ],
  ngo: [
    {
      id: 101,
      name: "Operations Fund",
      val: "₹5,000",
      pts: 1000,
      active: true,
      tag: "Grant",
      description: "Quick cash for electricity, water, and basic office bills.",
    },
  ],
  volunteer: [
    {
      id: 201,
      name: "Fuel Money",
      val: "₹1,000",
      pts: 500,
      active: true,
      tag: "Cash",
    },
  ],
};

const initialRedemptions: Redemption[] = [
  {
    id: "RD1",
    userName: "Hotel Grand",
    userType: "Donor",
    rewardName: "Premium Partner Badge",
    pointsDeducted: 2000,
    status: "Pending",
    date: "2026-02-25",
  },
];

export const useRewardsStore = create<RewardsStore>((set) => ({
  catalog: INITIAL_CATALOG,
  redemptions: initialRedemptions,

  setCatalog: (catalog) => set({ catalog }),

  addReward: (category, reward) =>
    set((state) => ({
      catalog: {
        ...state.catalog,
        [category]: [...state.catalog[category], reward],
      },
    })),

  updateReward: (category, id, updates) =>
    set((state) => ({
      catalog: {
        ...state.catalog,
        [category]: state.catalog[category].map((r) =>
          r.id === id ? { ...r, ...updates } : r,
        ),
      },
    })),

  toggleRewardActive: (category, id) =>
    set((state) => ({
      catalog: {
        ...state.catalog,
        [category]: state.catalog[category].map((r) =>
          r.id === id ? { ...r, active: !r.active } : r,
        ),
      },
    })),

  deleteReward: (category, id) =>
    set((state) => ({
      catalog: {
        ...state.catalog,
        [category]: state.catalog[category].filter((r) => r.id !== id),
      },
    })),

  setRedemptions: (redemptions) => set({ redemptions }),

  approveRedemption: (id) =>
    set((state) => ({
      redemptions: state.redemptions.map((r) =>
        r.id === id ? { ...r, status: "Approved" } : r,
      ),
    })),

  rejectRedemption: (id) =>
    set((state) => ({
      redemptions: state.redemptions.map((r) =>
        r.id === id ? { ...r, status: "Rejected" } : r,
      ),
    })),
}));
