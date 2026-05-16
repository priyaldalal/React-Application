/**
 * Global UI Configuration — Single Source of Truth
 * All component dimensions, spacing, and sizing reference these constants.
 */

export const UI_CONFIG = {
  // ── Spacing Scale ──
  spacing: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
  },

  // ── Layout Shells ──
  navbar: {
    height: '40px',         // h-10
  },
  sidebar: {
    width: '200px',
    collapsedWidth: '52px',
    itemHeight: '32px',     // h-8 — compact rows
  },

  // ── Modal / Dialog ──
  dialog: {
    sm: '380px',
    md: '480px',
    lg: '640px',
  },

  // ── Notifications ──
  notifications: {
    width: '300px',
    maxHeight: '360px',
  },

  // ── Tooltip ──
  tooltip: {
    defaultPosition: 'right',
    offset: 6,
  },

  // ── Typography Scale (px) ──
  type: {
    '2xs': '7px',   // micro-metadata
    xs:    '8px',   // labels, tracking
    sm:    '9px',   // body small
    base:  '10px',  // body
    md:    '11px',  // emphasis
    lg:    '13px',  // section headers
    xl:    '15px',  // page titles
  },

  // ── Component Heights ──
  input: {
    height: '28px',  // compact inputs
  },
  button: {
    sm: '24px',
    md: '28px',
    lg: '32px',
  },

  // ── Border Radius ──
  radius: {
    sm: '4px',     // rounded
    md: '6px',     // rounded-md
    lg: '8px',     // rounded-lg
  },

  // ── Card ──
  card: {
    padding: '10px',
    radius: '8px',
  },
};

export default UI_CONFIG;
