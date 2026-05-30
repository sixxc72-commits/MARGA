import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: "#a855f7",
          blue: "#22d3ee",
          pink: "#ec4899"
        },
        deep: "#05030a"
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"]
      },
      boxShadow: {
        neon: "0 0 20px rgba(168,85,247,0.6), 0 0 40px rgba(34,211,238,0.3)",
        glow: "0 0 30px rgba(168,85,247,0.45)"
      },
      backgroundImage: {
        "anime-gradient":
          "radial-gradient(ellipse at top, rgba(168,85,247,0.25), transparent 60%), radial-gradient(ellipse at bottom, rgba(34,211,238,0.2), transparent 60%), linear-gradient(180deg,#05030a,#0a0418)"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      }
    }
  },
  plugins: []
};
export default config;
