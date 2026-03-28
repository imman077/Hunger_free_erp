import { create } from "zustand";
import type { Donation, Volunteer, DonationStats } from "./donation-schemas";

interface DonationState {
  donations: Donation[];
  volunteers: Volunteer[];
  stats: DonationStats[];

  // Actions
  setDonations: (donations: Donation[]) => void;
  updateDonation: (id: string, updates: Partial<Donation>) => void;
  setStats: (stats: DonationStats[]) => void;
}

const initialDonations: Donation[] = [
  {
    id: "001",
    donor: "Hotel Grand",
    foodType: "Prepared Meals",
    quantity: "50 meals",
    pickupTime: "Today 14:00",
    status: "Assigned",
    assignedVolunteer: null,
  },
  {
    id: "002",
    donor: "Restaurant X",
    foodType: "Raw Ingredients",
    quantity: "25 kg",
    pickupTime: "Tomorrow 10:00",
    status: "Pending",
    assignedVolunteer: null,
  },
  {
    id: "003",
    donor: "Cafe Brew",
    foodType: "Baked Goods",
    quantity: "15 items",
    pickupTime: "Today 16:30",
    status: "In Progress",
    assignedVolunteer: null,
  },
  {
    id: "004",
    donor: "Event Hall Y",
    foodType: "Prepared Meals",
    quantity: "100 meals",
    pickupTime: "Tomorrow 13:00",
    status: "Pending",
    assignedVolunteer: null,
  },
  {
    id: "005",
    donor: "Supermarket Z",
    foodType: "Produce",
    quantity: "30 kg",
    pickupTime: "Today 11:00",
    status: "Completed",
    assignedVolunteer: null,
  },
];

const initialVolunteers: Volunteer[] = [
  {
    id: "V001",
    name: "Arun Vijay",
    rating: "4.8",
    vehicle: "Car (Swift)",
    distance: "1.2 km",
    tasks: 45,
  },
  {
    id: "V002",
    name: "Manikandan",
    rating: "4.9",
    vehicle: "Bike (Xpulse)",
    distance: "0.8 km",
    tasks: 60,
  },
  {
    id: "V003",
    name: "Siddarth",
    rating: "4.2",
    vehicle: "SUV (Thar)",
    distance: "2.5 km",
    tasks: 22,
  },
];

const initialStats: DonationStats[] = [
  {
    label: "Active Donations",
    val: "84",
    trend: "+12% from yesterday",
    color: "bg-emerald-500",
  },
  {
    label: "Total Weight",
    val: "1,240 KG",
    trend: "+150 KG today",
    color: "bg-emerald-500",
  },
];

export const useDonationStore = create<DonationState>((set) => ({
  donations: initialDonations,
  volunteers: initialVolunteers,
  stats: initialStats,

  setDonations: (donations) => set({ donations }),

  updateDonation: (id, updates) =>
    set((state) => ({
      donations: state.donations.map((d) =>
        d.id === id ? { ...d, ...updates } : d,
      ),
    })),

  setStats: (stats) => set({ stats }),
}));
