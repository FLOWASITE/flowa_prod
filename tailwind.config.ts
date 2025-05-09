
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#ea384c",
          foreground: "#FFFFFF",
          container: "#FFE2E5",
          hover: "#F04D5F",
        },
        secondary: {
          DEFAULT: "#B3384C",
          foreground: "#FFFFFF",
          container: "#FFE2E5",
          hover: "#C74D5F",
        },
        destructive: {
          DEFAULT: "#B3261E",
          foreground: "#FFFFFF",
          container: "#F9DEDC",
        },
        muted: {
          DEFAULT: "#79747E",
          foreground: "#49454F",
        },
        accent: {
          DEFAULT: "#EA5F70",
          foreground: "#FFFFFF",
          container: "#FFE2E5",
        },
        surface: {
          DEFAULT: "#FFFBFA",
          dim: "#F7EFEF",
          bright: "#FFF8F8",
          container: {
            lowest: "#FFFFFF",
            low: "#FFF4F4",
            default: "#FFE9E9",
            high: "#FFE2E2",
            highest: "#FFD9D9",
          },
        }
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
        sm: "8px",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      fontSize: {
        "display-large": ["57px", { lineHeight: "64px", letterSpacing: "-0.25px" }],
        "display-medium": ["45px", { lineHeight: "52px" }],
        "display-small": ["36px", { lineHeight: "44px" }],
        "headline-large": ["32px", { lineHeight: "40px" }],
        "headline-medium": ["28px", { lineHeight: "36px" }],
        "headline-small": ["24px", { lineHeight: "32px" }],
        "title-large": ["22px", { lineHeight: "28px" }],
        "title-medium": ["16px", { lineHeight: "24px", letterSpacing: "0.15px", fontWeight: "500" }],
        "title-small": ["14px", { lineHeight: "20px", letterSpacing: "0.1px", fontWeight: "500" }],
        "label-large": ["14px", { lineHeight: "20px", letterSpacing: "0.1px" }],
        "label-medium": ["12px", { lineHeight: "16px", letterSpacing: "0.5px" }],
        "label-small": ["11px", { lineHeight: "16px", letterSpacing: "0.5px" }],
        "body-large": ["16px", { lineHeight: "24px", letterSpacing: "0.5px" }],
        "body-medium": ["14px", { lineHeight: "20px", letterSpacing: "0.25px" }],
        "body-small": ["12px", { lineHeight: "16px", letterSpacing: "0.4px" }],
      },
      boxShadow: {
        'md3-1': '0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
        'md3-2': '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)',
        'md3-3': '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
        'md3-4': '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
        'md3-5': '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
