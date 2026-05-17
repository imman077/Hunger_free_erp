/**
 * Configuration for donation-related constants.
 * This includes food categories, unit options, and other dropdown configurations.
 */

export const FOOD_CATEGORIES = [
  { value: "Fruits & Vegetables", label: "Fruits & Vegetables" },
  { value: "Cooked Food", label: "Cooked Food" },
  { value: "Rice, Grains & Pulses", label: "Rice, Grains & Pulses" },
  { value: "Packaged Snacks", label: "Packaged Snacks" },
  { value: "Bread & Bakery", label: "Bread & Bakery" },
  { value: "Milk & Dairy", label: "Milk & Dairy" },
  { value: "Meat & Eggs", label: "Meat & Eggs" },
  { value: "Seafood", label: "Seafood" },
  { value: "Water & Drinks", label: "Water & Drinks" },
  { value: "Frozen Food", label: "Frozen Food" },
  { value: "Spices & Oils", label: "Spices & Oils" },

];

export const UNIT_OPTIONS = [
  { value: "kg", label: "Kilograms (kg)" },
  { value: "portions", label: "Portions" },
  { value: "parcels", label: "Parcels" },
  { value: "units", label: "Units" },
  { value: "liters", label: "Liters" },
  { value: "packs", label: "Packs" },
  { value: "boxes", label: "Boxes" },
  { value: "pieces", label: "Pieces" },
  { value: "grams", label: "Grams (g)" },
];

export const DIETARY_TYPES = [
  { value: "Veg", label: "Vegetarian (Veg)" },
  { value: "Non-Veg", label: "Non-Vegetarian (Non-Veg)" },
  { value: "Vegan", label: "Vegan" },
];

export const PREPARATION_TYPES = [
  { value: "Restaurant", label: "Restaurant Surplus" },
  { value: "Catering", label: "Catering / Event" },
];

export const NEED_CATEGORIES = [
  { value: "food", label: "Food & Grains" },
  { value: "water", label: "Drinking Water" },
  { value: "clothing", label: "Clothing & Apparel" },
  { value: "hygiene", label: "Hygiene Kits" },
  { value: "medical", label: "Medical Supplies" },
  { value: "education", label: "Education Kits" },
  { value: "bedding", label: "Bedding & Blankets" },
  { value: "kitchen", label: "Kitchen & Home Items" },
  { value: "baby", label: "Baby Care" },
  { value: "elderly", label: "Elderly Care" },
  { value: "technology", label: "Computers & Tech" },
  { value: "stationery", label: "Books & Stationery" },
  { value: "power", label: "Solar & Power" },
  { value: "other", label: "Other" },
];

export const URGENCY_OPTIONS = [
  { value: "low", label: "Low Priority" },
  { value: "medium", label: "Medium Priority" },
  { value: "high", label: "High Priority" },
  { value: "urgent", label: "Urgent" },
];
