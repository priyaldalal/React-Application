/**
 * Global UI Configuration Constants
 * Centralized settings for consistency across the application.
 */

export const UI_CONFIG = {
  // Spacing Scale
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
  },

  // Component Dimensions
  navbar: {
    height: '2.5rem', // 40px (h-10)
  },
  sidebar: {
    width: '200px',
    collapsedWidth: '60px',
  },
  
  // Dialog / Modal Sizes
  dialog: {
    sm: '400px',
    md: '550px',
    lg: '800px',
  },

  // Notification Dimensions
  notifications: {
    itemHeight: 'auto',
    maxHeight: '400px',
    width: '320px',
  },

  // Tooltip Configuration
  tooltip: {
    defaultPosition: 'right',
    spacing: 8,
  },

  // Typography Scale (Dense)
  typography: {
    tiny: '9px',
    small: '10px',
    base: '11px',
    header: '13px',
    title: '16px',
  },

  // Border Radius (Themed)
  radius: {
    sm: '0.375rem',  // rounded-md
    md: '0.5rem',    // rounded-lg
    lg: '0.75rem',   // rounded-xl
  }
};

export default UI_CONFIG;
