#!/usr/bin/env node

/**
 * Theme Migration Helper Script
 * Systematically replaces hardcoded colors with CSS variables
 */

const replacements = [
  // Backgrounds
  {
    from: "bg-white",
    to: "style={{ backgroundColor: 'var(--bg-primary)' }}",
    type: "bg",
  },
  {
    from: "bg-gray-50",
    to: "style={{ backgroundColor: 'var(--bg-secondary)' }}",
    type: "bg",
  },
  {
    from: "bg-slate-100",
    to: "style={{ backgroundColor: 'var(--bg-tertiary)' }}",
    type: "bg",
  },

  // Text colors
  {
    from: "text-slate-900",
    to: "style={{ color: 'var(--text-primary)' }}",
    type: "text",
  },
  {
    from: "text-gray-900",
    to: "style={{ color: 'var(--text-primary)' }}",
    type: "text",
  },
  {
    from: "text-black",
    to: "style={{ color: 'var(--text-primary)' }}",
    type: "text",
  },
  {
    from: "text-gray-600",
    to: "style={{ color: 'var(--text-secondary)' }}",
    type: "text",
  },
  {
    from: "text-slate-600",
    to: "style={{ color: 'var(--text-secondary)' }}",
    type: "text",
  },
  {
    from: "text-gray-400",
    to: "style={{ color: 'var(--text-muted)' }}",
    type: "text",
  },
  {
    from: "text-slate-400",
    to: "style={{ color: 'var(--text-muted)' }}",
    type: "text",
  },

  // Borders
  {
    from: "border-gray-100",
    to: "style={{ borderColor: 'var(--border-color)' }}",
    type: "border",
  },
  {
    from: "border-slate-100",
    to: "style={{ borderColor: 'var(--border-color)' }}",
    type: "border",
  },
  {
    from: "border-gray-200",
    to: "style={{ borderColor: 'var(--border-light)' }}",
    type: "border",
  },
];

// Files to update
const modules = [
  "donor/pages/rewards/Rewards.tsx",
  "donor/pages/profile/Profile.tsx",
  "donor/pages/donations/MyDonations.tsx",
  "donor/pages/donations/CreateDonation.tsx",
  "volunteer/pages/dashboard/Dashboard.tsx",
  "volunteer/pages/rewards/Rewards.tsx",
  "volunteer/pages/tasks/Tasks.tsx",
  "volunteer/pages/profile/Profile.tsx",
  "ngo/pages/dashboard/Dashboard.tsx",
  "ngo/pages/rewards/Rewards.tsx",
  "ngo/pages/profile/Profile.tsx",
  "ngo/pages/inventory/Inventory.tsx",
  "ngo/pages/needs/PostNewNeed.tsx",
];

console.log("Theme Migration Plan:");
console.log("====================");
console.log(`Total files to update: ${modules.length}`);
console.log(`Total replacements per file: ~${replacements.length}`);
console.log("\nNote: Manual review required for complex cases");
