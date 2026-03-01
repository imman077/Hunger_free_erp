import { create } from "zustand";
import type { SystemConfig, ConfigItem } from "./config-schemas";

interface ConfigStore {
  config: SystemConfig;

  // Actions
  setConfig: (config: SystemConfig) => void;
  addItem: (section: keyof SystemConfig, item: Omit<ConfigItem, "id">) => void;
  updateItem: (
    section: keyof SystemConfig,
    id: number,
    updates: Partial<ConfigItem>,
  ) => void;
  deleteItem: (section: keyof SystemConfig, id: number) => void;
}

const INITIAL_CONFIG: SystemConfig = {
  foodCategories: [
    { id: 1, name: "Cooked Food", description: "Ready-to-eat meals" },
    { id: 2, name: "Fresh Produce", description: "Fruits and vegetables" },
    { id: 3, name: "Packaged Items", description: "Sealed packaged goods" },
    { id: 4, name: "Beverages", description: "Drinks and liquids" },
  ],
  donationStatuses: [
    { id: 1, name: "Pending Pickup", color: "amber" },
    { id: 2, name: "In Transit", color: "blue" },
    { id: 3, name: "Delivered", color: "emerald" },
    { id: 4, name: "Cancelled", color: "red" },
  ],
  userStatuses: [
    { id: 1, name: "Active", color: "emerald" },
    { id: 2, name: "Inactive", color: "slate" },
    { id: 3, name: "Pending Approval", color: "amber" },
    { id: 4, name: "Suspended", color: "red" },
  ],
  ngoTypes: [
    { id: 1, name: "Food Bank", description: "Large-scale food distribution" },
    { id: 2, name: "Shelter", description: "Housing with food services" },
    { id: 3, name: "Community Kitchen", description: "Local meal preparation" },
    { id: 4, name: "School Program", description: "Student meal programs" },
  ],
  volunteerSkills: [
    { id: 1, name: "Driving", description: "Vehicle operation for delivery" },
    { id: 2, name: "Cooking", description: "Food preparation skills" },
    { id: 3, name: "Logistics", description: "Coordination and planning" },
    { id: 4, name: "Packaging", description: "Food packing and sorting" },
  ],
};

export const useConfigStore = create<ConfigStore>((set) => ({
  config: INITIAL_CONFIG,

  setConfig: (config) => set({ config }),

  addItem: (section, item) =>
    set((state) => {
      const currentItems = state.config[section];
      const maxId = Math.max(...currentItems.map((i) => i.id), 0);
      return {
        config: {
          ...state.config,
          [section]: [...currentItems, { ...item, id: maxId + 1 }],
        },
      };
    }),

  updateItem: (section, id, updates) =>
    set((state) => ({
      config: {
        ...state.config,
        [section]: state.config[section].map((item) =>
          item.id === id ? { ...item, ...updates } : item,
        ),
      },
    })),

  deleteItem: (section, id) =>
    set((state) => ({
      config: {
        ...state.config,
        [section]: state.config[section].filter((item) => item.id !== id),
      },
    })),
}));
