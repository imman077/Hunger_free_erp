import { create } from "zustand";
import type { Enquiry, RewardEnquiry } from "./enquiry-schemas";

interface EnquiryStore {
  registrations: Enquiry[];
  claims: Enquiry[];
  payments: Enquiry[];
  updates: Enquiry[];
  rewards: RewardEnquiry[];

  // Actions
  setRegistrations: (data: Enquiry[]) => void;
  setRewards: (data: RewardEnquiry[]) => void;
  approve: (
    type: "registrations" | "claims" | "payments" | "updates" | "rewards",
    id: string,
  ) => void;
  reject: (
    type: "registrations" | "claims" | "payments" | "updates" | "rewards",
    id: string,
  ) => void;
}

const mockRegistrations: Enquiry[] = [
  {
    id: "NGO-101",
    name: "Green Harvest NGO",
    type: "NGO Registration",
    email: "contact@greenharvest.org",
    phone: "+91 98765 43210",
    city: "Coimbatore",
    status: "Registration Pending",
    time: "2 hours ago",
    priority: "high",
    appliedDate: "Feb 18, 2026",
    regNo: "NGO/TN/2026/001",
    link: "/admin/enquiries/ngos",
  },
  {
    id: "KYC-902",
    name: "Isaiah Rivera",
    type: "Volunteer KYC",
    status: "Verify details",
    time: "5 hours ago",
    priority: "medium",
    link: "/admin/enquiries/volunteers",
  },
];

const mockRewards: RewardEnquiry[] = [
  {
    id: "RWD-443",
    name: "Elite Membership",
    user: "Amit Sharma",
    userType: "Volunteer",
    points: "5,000",
    status: "Approval Required",
    time: "Yesterday",
    priority: "low",
    appliedDate: "Feb 17, 2026",
    category: "Lifestyle",
    userPointsBalance: "7,800",
  },
  {
    id: "RWD-450",
    name: "Jackpot Prize",
    user: "Green Harvest NGO",
    userType: "NGO",
    points: "15,000",
    status: "Awaiting Admin",
    time: "4 hours ago",
    priority: "high",
    appliedDate: "Feb 18, 2026",
    category: "Grant",
    userPointsBalance: "16,200",
  },
];

export const useEnquiryStore = create<EnquiryStore>((set) => ({
  registrations: mockRegistrations,
  claims: [],
  payments: [],
  updates: [],
  rewards: mockRewards,

  setRegistrations: (registrations) => set({ registrations }),
  setRewards: (rewards) => set({ rewards }),

  approve: (type, id) =>
    set((state) => ({
      [type]: state[type].filter((e: any) => e.id !== id),
    })),

  reject: (type, id) =>
    set((state) => ({
      [type]: state[type].filter((e: any) => e.id !== id),
    })),
}));
