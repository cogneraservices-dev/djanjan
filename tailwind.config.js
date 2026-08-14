/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // NOTE: the 9 tokens marked "live" below are the values the production site
      // actually renders. The dev server it was recovered from was still serving CSS
      // compiled from this older palette; the config file on disk had been edited to a
      // pure #0d0d0d/#ffffff monochrome scheme that never took effect (no restart).
      // These values reproduce the live site exactly. See README.md.
      colors: {
        "surface-container-highest": "#353534", // live (disk source said #262626)
        "tertiary-fixed-dim": "#cccccc",
        "tertiary": "#ffffff",
        "surface-container-lowest": "#0e0e0e", // live (disk source said #060606)
        "surface-container-high": "#1e1e1e",
        "on-secondary-fixed-variant": "#a3a3a3",
        "error-container": "#93000a",
        "primary-fixed": "#ffffff",
        "secondary-container": "#1f1f1f",
        "on-secondary-container": "#ffffff",
        "primary-fixed-dim": "#cccccc",
        "surface-variant": "#262626",
        "on-error-container": "#ffdad6",
        "surface": "#131313", // live (disk source said #0d0d0d)
        "surface-bright": "#262626",
        "primary": "#c6c6c6", // live (disk source said #ffffff)
        "background": "#131313", // live (disk source said #0d0d0d)
        "on-primary": "#000000",
        "error": "#ffb4ab",
        "on-tertiary-fixed-variant": "#a3a3a3",
        "surface-container": "#171717",
        "on-tertiary": "#000000",
        "on-primary-fixed": "#000000",
        "secondary-fixed-dim": "#cccccc",
        "on-secondary-fixed": "#000000",
        "on-error": "#690005",
        "surface-container-low": "#1c1b1b", // live (disk source said #121212)
        "surface-tint": "#ffffff",
        "on-secondary": "#000000",
        "inverse-surface": "#ffffff",
        "outline-variant": "#1f1f1f",
        "primary-container": "#000000",
        "tertiary-container": "#000000",
        "on-surface-variant": "#cfc4c5", // live (disk source said #a3a3a3)
        "secondary": "#ffffff",
        "surface-dim": "#0d0d0d",
        "on-surface": "#e5e2e1", // live (disk source said #ffffff)
        "inverse-primary": "#5e5e5e",
        "on-primary-container": "#ffffff",
        "on-primary-fixed-variant": "#a3a3a3",
        "on-background": "#e5e2e1", // live (disk source said #ffffff)
        "tertiary-fixed": "#ffffff",
        "on-tertiary-fixed": "#000000",
        "on-tertiary-container": "#ffffff",
        "secondary-fixed": "#ffffff",
        "outline": "#333333",
        "inverse-on-surface": "#171717"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
      spacing: {
        "stack-md": "40px",
        "stack-lg": "120px",
        "stack-sm": "16px",
        "gutter": "24px",
        "unit": "8px",
        "margin-mobile": "20px",
        "margin-desktop": "80px",
        "container-max": "1440px"
      },
      fontFamily: {
        "body-lg": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "headline-md": ["Syne", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "display-xl": ["Syne", "sans-serif"],
        "headline-lg": ["Syne", "sans-serif"],
        "headline-lg-mobile": ["Syne", "sans-serif"]
      },
      fontSize: {
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "700" }],
        "headline-md": ["32px", { "lineHeight": "40px", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "display-xl": ["120px", { "lineHeight": "110px", "letterSpacing": "-0.04em", "fontWeight": "800" }],
        "headline-lg": ["64px", { "lineHeight": "72px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-lg-mobile": ["40px", { "lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700" }]
      }
    }
  },
  plugins: [],
}
