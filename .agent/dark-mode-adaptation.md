# Task: Dark Mode Adaptation for Admin User Creation Pages

## Objective

Adapt `CreateDonor.tsx`, `CreateNgo.tsx`, and `CreateVolunteer.tsx` to support dark mode by replacing hardcoded light-mode colors with theme-aware CSS variables or Tailwind classes.

## Scope

- `src/modules/admin/pages/users/CreateDonor.tsx`
- `src/modules/admin/pages/users/CreateNgo.tsx`
- `src/modules/admin/pages/users/CreateVolunteer.tsx`

## Design Strategy

- Use `var(--bg-primary)` for main cards and surfaces.
- Use `var(--bg-secondary)` for page backgrounds and nested containers.
- Use `var(--text-primary)` for headings and main text.
- Use `var(--text-secondary)` and `var(--text-muted)` for labels and secondary text.
- Use `var(--border-color)` for borders.
- Replace `bg-white` with theme-aware background.
- Replace `text-slate-800` with `var(--text-primary)`.
- Replace `bg-slate-50` with `var(--bg-tertiary)` or similar.

## Implementation Steps

### 1. CreateDonor.tsx

- Update main container background.
- Update header bar styles.
- Update card background and borders.
- Update section headers (bg-slate-50 -> var(--bg-tertiary)).
- Update file upload placeholders.
- Update fixed action bar background.

### 2. CreateNgo.tsx

- Similar updates to CreateDonor.tsx.
- Handle category-specific sections.
- Handle file preview modal (if applicable).

### 3. CreateVolunteer.tsx

- Similar updates to and Volunteer specific sections.
- Handle success modal styles.

## Verification

- Check all three pages in light mode.
- Check all three pages in dark mode.
- Ensure text contrast is sufficient.
- Ensure borders are visible in both modes.
