# Development & Cloud Rules

## 1. Code Quality & Standards
- **Component Architecture**: Follow a component-based architecture. Keep components small, focused, and reusable.
- **Naming Conventions**: Use `PascalCase` for components and `camelCase` for variables/functions.
- **Strict Typing**: If using TypeScript, avoid `any`. In JavaScript, use JSDoc for complex objects.
- **Dry Principle**: Don't Repeat Yourself. Extract repeated logic into hooks or utility functions.

## 2. Professional Form Standards
- **Reusable Form Components**: All form inputs must be decoupled from business logic.
- **Validation**: Use a centralized validation schema (e.g., Yup, Zod, or custom validation hooks).
- **Accessibility**: Every input must have an associated label and proper ARIA attributes.
- **Feedback**: Provide immediate visual feedback for validation errors and success states.
- **UX**: Use placeholders, tooltips, and appropriate input types (e.g., `tel` for mobile, `email` for email).

## 3. Styling & UI/UX
- **Design System**: Use a consistent design system. Leverage Tailwind CSS with a custom configuration.
- **Responsiveness**: All pages must be fully responsive (Mobile, Tablet, Desktop).
- **Themes**: Support Dark Mode natively using CSS variables or Tailwind's `dark:` classes.
- **Micro-animations**: Use subtle animations (Framer Motion or CSS transitions) to enhance the "premium" feel.
- **Loading States**: Always show skeleton loaders or spinners during async operations.

## 4. Cloud & Deployment Rules
- **Environment Variables**: Never hardcode API keys or sensitive URLs. Use `.env` files.
- **Build Optimization**: Run `npm run build` and verify the bundle size before deployment.
- **CI/CD**: Maintain a clean Git history. Every PR should be linted and tested.
- **Performance**: Optimize images (use WebP/AVIF) and use lazy loading for routes and heavy components.
- **Error Tracking**: Implement global error boundaries and integrate with a tracking tool (e.g., Sentry) in production.

## 5. State Management
- **Local State**: Use `useState` and `useReducer` for component-specific state.
- **Global State**: Use React Context or Redux only when state needs to be shared across many disconnected components.
- **Persistence**: Use `localStorage` or `sessionStorage` carefully for persistent user preferences.

## 6. API & Data Handling
- **Service Layer**: Decouple API calls into a dedicated `services/` directory.
- **Error Handling**: Use `try-catch` blocks and provide user-friendly error messages via Toasts.
- **Loading Indicators**: Manage loading states globally or per-component to prevent UI flickering.

---
*Created by Antigravity AI*
