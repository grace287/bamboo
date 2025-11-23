import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emotionBg: "#0f172a",   // 딥 네이비
        emotionAccent: "#a855f7", // 보라
      },
      boxShadow: {
        glass: "0 10px 40px rgba(15,23,42,0.7)",
      },
      animation: {
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;
