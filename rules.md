# Enterprise Development Rules & UI Standards

## 1. Typography & Density
- **Base Font Size**: Use `text-xs` (12px) or `text-[11px]` for primary content.
- **Micro-copy**: Use `text-[9px]` or `text-[8px]` for status badges, IDs, and secondary metadata.
- **Headers**: Page headers should not exceed `text-xl`. Section titles should be `text-sm` or `text-xs`.
- **Data Density**: Maximize vertical space. Table rows should have minimal padding (`py-2` or `py-1.5`).

## 2. Layout & Spacing
- **Outer Padding**: Maintain a consistent `p-4 md:p-6` for main content areas.
- **Component Spacing**: Use `gap-4` or `gap-2` for component relationships. Avoid large gutters.
- **Navigation**: Navbar height is fixed at `h-14`. Sidebar width is `w-64` (expanded) and `w-20` (collapsed).

## 3. Theming & Aesthetics
- **Dark Mode**: Always use semantic classes (`dark:bg-slate-900`, `dark:text-slate-100`).
- **Native Controls**: Ensure native inputs (date, select) use `color-scheme: dark` to match the system theme.
- **Borders**: Use subtle borders (`border-slate-200` / `dark:border-slate-800`). Avoid heavy shadows.
- **Interactive Elements**: All buttons and inputs must have smooth transitions (`transition-all duration-200`).

## 4. Components
- **PageHeader**: Always includes breadcrumbs (text-[9px]) and primary actions.
- **Section**: Standard wrapper for grouped form fields or data blocks.
- **Form Controls**: Use `TextBox`, `EmailBox`, `SelectionBox`, and `DatePicker` wrappers for consistency.

## 5. Performance & State
- **Reactive UI**: Components like Navbar must respond to `localStorage` changes via the `storage` event.
- **Transitions**: Use `framer-motion` for page transitions (`initial={{ opacity: 0, y: 10 }}`).
