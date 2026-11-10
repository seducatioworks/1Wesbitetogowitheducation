/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Institutional Academic Palette
        navy: {
          DEFAULT: "var(--color-navy, #172B4D)", // Institutional Navy
          dark: "var(--color-navy-dark, #0F1D33)", // Midnight Navy
          light: "var(--color-navy-light, #213A65)", // Light Navy
        },
        cream: {
          DEFAULT: "var(--color-cream, #FFF4E3)", // Cream
          soft: "var(--color-cream-soft, #FFFDF8)", // Soft Cream
        },
        midnight: "#0F1D33",
        academic: {
          DEFAULT: "#315F96", // Academic Blue
          light: "#456B9A",   // Restrained Blue Accent
          surface: "#EDF3F9", // Muted Blue Surface
        },
        "warm-white": "#FCFCFA",
        "pure-white": "#FFFFFF",
        parchment: "#FCFCFA",   // Harmonized with Warm White
        surface: {
          DEFAULT: "#F4F6F8", // Subtle Surface
          blue: "#EDF3F9",    // Muted Blue Surface
        },
        slate: {
          DEFAULT: "#64748B", // Slate
          dark: "#475569",    // Secondary Text
          light: "#94A3B8",
        },
        ink: {
          DEFAULT: "#172B4D", // Primary Institutional Navy
          muted: "#475569",   // Secondary Text
          subtle: "#64748B",
        },
        border: {
          DEFAULT: "#E2E8F0", // Light Border
          subtle: "#E2E8F0",
          card: "#E2E8F0",
        },
        // Old palette aliases redirected to institutional palette
        trust: {
          DEFAULT: "#315F96",
          hover: "#234975",
          light: "#EDF3F9",
        },
        brass: {
          DEFAULT: "#315F96", // Remapped to Academic Blue
          light: "#456B9A",
          dark: "#172B4D",
        },
        stone: {
          muted: "#E2E8F0",
          warm: "#F4F6F8",
        },
      },
      fontFamily: {
        sans: ["'Manrope'", "system-ui", "-apple-system", "sans-serif"],
        heading: ["'Manrope'", "system-ui", "-apple-system", "sans-serif"],
        ui: ["'Manrope'", "system-ui", "-apple-system", "sans-serif"],
        body: ["'Manrope'", "system-ui", "-apple-system", "sans-serif"],
        editorial: ["'Manrope'", "system-ui", "-apple-system", "sans-serif"],
        serif: ["'Manrope'", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        xs: "2px",
        sm: "4px",
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
      },
    },
  },
  plugins: [],
}
