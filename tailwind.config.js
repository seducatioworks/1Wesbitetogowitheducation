/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#FFFDF8",
        navy: {
          DEFAULT: "#172B4D",
          dark: "#0F1D33",
          light: "#213A65",
        },
        trust: {
          DEFAULT: "#3B6FF5",
          hover: "#2A5DE0",
          light: "#EBF1FE",
        },
        ink: {
          DEFAULT: "#172033",
          muted: "#64748B",
          subtle: "#94A3B8",
        },
        border: {
          subtle: "#E2E8F0",
          card: "#CBD5E1",
        }
      },
      fontFamily: {
        heading: ["'Manrope'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "6px",
        md: "6px",
        lg: "8px",
      },
    },
  },
  plugins: [],
}
