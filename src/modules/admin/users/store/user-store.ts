import { create } from "zustand";
import { UserDataSchema } from "./user-schemas";
import type { UserData, Donor, Ngo, Volunteer, UserItem } from "./user-schemas";

interface UserState {
  data: UserData;
  isLoading: boolean;
  error: string | null;

  // Actions
  setUserData: (data: Partial<UserData>) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Specific Entity Actions
  updateDonor: (donor: Donor) => void;
  updateNgo: (ngo: Ngo) => void;
  updateVolunteer: (volunteer: Volunteer) => void;
  updateUserItem: (user: UserItem) => void;
}

// Initial mock data harvested from the existing pages
const initialData: UserData = {
  donors: [
    {
      id: 1,
      businessName: "Saravana Bhavan",
      type: "Restaurant",
      totalDonations: 8500,
      points: 1700,
      status: "Active",
      contactPerson: "Sathish Kumar",
      email: "contact@saravanabhavan.in",
      address: "Mylapore, Chennai, Tamil Nadu, 600004",
      donationHistory: [
        { event: "Margazhi Food Drive", date: "2023-12-15", amount: 3000 },
        { event: "Flood Relief Support", date: "2023-11-20", amount: 2500 },
        {
          event: "Temple Feast Contribution",
          date: "2023-05-10",
          amount: 3000,
        },
      ],
      phone: "+91-44-2431-1515", // Placeholder
    },
    {
      id: 2,
      businessName: "ITC Grand Chola",
      type: "Hotel",
      totalDonations: 15000,
      points: 3000,
      status: "Active",
      contactPerson: "Rema Devi",
      email: "rema.d@itchotels.in",
      address: "Guindy, Chennai, Tamil Nadu, 600032",
      donationHistory: [
        { event: "Heritage Charity Ball", date: "2023-10-15", amount: 6000 },
        { event: "Education For All", date: "2023-07-20", amount: 5000 },
        { event: "Youth Skill Program", date: "2022-11-05", amount: 4000 },
      ],
      phone: "+91-44-2220-0000", // Placeholder
    },
  ],
  ngos: [
    {
      id: 1,
      name: "Agaram Foundation",
      registrationNo: "REG-TN-2006-112",
      serviceAreas: ["Education", "Youth Development"],
      beneficiaries: "Children & Youth",
      status: "Active",
      email: "info@agaram.foundation",
      phone: "+91-44-2431-1515",
      address: "T. Nagar, Chennai, Tamil Nadu",
      volunteers: ["Suriya Sivakumar", "Jyothika"],
    },
    {
      id: 2,
      name: "Siruthuli",
      registrationNo: "NGO-TN-2003-045",
      serviceAreas: ["Water Conservation", "Afforestation"],
      beneficiaries: "Local Communities",
      status: "Pending",
      email: "contact@siruthuli.com",
      phone: "+91-422-230-1122",
      address: "Ettimadai, Coimbatore, Tamil Nadu",
      volunteers: ["Vanitha Mohan", "Ravi Sam"],
    },
  ],
  volunteers: [
    {
      id: 0,
      name: "Arun Vijay",
      zone: "North",
      volunteerAreas: ["Anna Nagar", "Ambattur"],
      tasksCompleted: 45,
      totalTasks: 50,
      missedTasks: 2,
      rating: "4.8",
      status: "available",
      onLeave: false,
      email: "arun.v@example.in",
      phone: "+91-98765-43210",
      emergencyPhone: "+91-98765-43999",
      address: "West Main Road, Anna Nagar, Chennai, TN, 600040",
      vehicle: "Swift (Car)",
      license: "TN 01 AB 1234",
      createdDate: "2023-11-12",
      verificationStatus: "Verified",
      lastActive: "2024-01-19 14:30",
      lastAssignment: "2024-01-18 10:00",
      allowedTaskTypes: ["Food Delivery", "Bulk Pickup"],
      fuelEligibility: true,
      isSuspended: false,
    },
  ],
  users: [
    {
      id: 1,
      name: "ITC Grand Chola",
      role: "Donor",
      status: "Active",
      date: "Dec 1, 2023",
      userId: "USR-00789",
      joinedDate: "3/15/2022",
      lastLogin: "2024-07-28",
      lastLoginTime: "10:30 AM",
      totalPoints: 1250,
      email: "grandchola@itc.in",
      phone: "+91-44-2220-0000",
      address: "63, Mount Road, Guindy, Chennai, Tamil Nadu 600032",
      organization: "ITC Hotels",
      location: "Tamil Nadu, India",
      badges: ["Hotel", "Verified"],
      donationsMade: 7,
      itemsDonated: 25,
      avgRating: 4.8,
      recentActivity: [
        {
          action: "Donated 50 food items to local shelter.",
          time: "2 hours ago",
          icon: "donate",
        },
      ],
      miniTimeline: [{ event: "Account created", date: "3/15/2022" }],
    },
  ],
};

export const useUserStore = create<UserState>((set) => ({
  data: initialData,
  isLoading: false,
  error: null,

  setUserData: (newData) => {
    set((state) => {
      const updatedData = { ...state.data, ...newData };
      // Optional: Validation
      return { data: updatedData };
    });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  updateDonor: (updatedDonor) => {
    set((state) => ({
      data: {
        ...state.data,
        donors: state.data.donors.map((d) =>
          d.id === updatedDonor.id ? updatedDonor : d,
        ),
      },
    }));
  },

  updateNgo: (updatedNgo) => {
    set((state) => ({
      data: {
        ...state.data,
        ngos: state.data.ngos.map((n) =>
          n.id === updatedNgo.id ? updatedNgo : n,
        ),
      },
    }));
  },

  updateVolunteer: (updatedVolunteer) => {
    set((state) => ({
      data: {
        ...state.data,
        volunteers: state.data.volunteers.map((v) =>
          v.id === updatedVolunteer.id ? updatedVolunteer : v,
        ),
      },
    }));
  },

  updateUserItem: (updatedUser) => {
    set((state) => ({
      data: {
        ...state.data,
        users: state.data.users.map((u) =>
          u.id === updatedUser.id ? updatedUser : u,
        ),
      },
    }));
  },
}));
