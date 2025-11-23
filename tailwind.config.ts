import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emotionBg: "#0f172a",
        emotionAccent: "#a855f7",
      },
      boxShadow: {
        glass: "0 10px 40px rgba(15,23,42,0.7)",
      },
      animation: {
        pulse: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn: "fadeIn 0.6s ease-out",
        fadeOut: "fadeOut 0.6s ease-in forwards",
        burn: "burn 1.5s ease-in-out",
        wave: "wave 0.8s ease-in-out",
        float: "float 3s ease-in-out infinite",
        sparkle: "sparkle 2s ease-out infinite",
        crumple: "crumple 1.2s ease-in forwards",
        shake: "shake 0.5s ease-in-out",
        glowPulse: "glowPulse 2s ease-in-out infinite",
        slideUp: "slideUp 0.8s ease-out",
        countdownPulse: "countdownPulse 0.6s ease-in-out",
        starFall: "starFall 2s ease-in",
      },
      keyframes: {
        fadeIn: {
          "from": { opacity: "0", transform: "scale(0.95) translateY(20px)" },
          "to": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        fadeOut: {
          "from": { opacity: "1", transform: "scale(1) translateY(0)" },
          "to": { opacity: "0", transform: "scale(0.95) translateY(20px)" },
        },
        burn: {
          "0%": { opacity: "1", transform: "scale(1) rotate(0deg)", filter: "brightness(1)" },
          "25%": { transform: "scale(1.05) rotate(2deg)", filter: "brightness(1.2) hue-rotate(10deg)" },
          "50%": { opacity: "0.7", transform: "scale(0.98) rotate(-2deg)", filter: "brightness(1.4) hue-rotate(30deg)" },
          "75%": { opacity: "0.3", transform: "scale(0.95) rotate(5deg)", filter: "brightness(1.6) hue-rotate(60deg)" },
          "100%": { opacity: "0", transform: "scale(0.8) rotate(-5deg)", filter: "brightness(2) hue-rotate(80deg)" },
        },
        wave: {
          "0%, 100%": { transform: "translateY(0px)" },
          "25%": { transform: "translateY(-15px)" },
          "50%": { transform: "translateY(0px)" },
          "75%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        sparkle: {
          "0%": { opacity: "0", transform: "scale(0) translateY(20px)" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0", transform: "scale(1) translateY(-20px)" },
        },
        crumple: {
          "0%": { transform: "scaleX(1) scaleY(1)" },
          "25%": { transform: "scaleX(0.95) scaleY(1.05)" },
          "50%": { transform: "scaleX(0.9) scaleY(1.1)" },
          "75%": { transform: "scaleX(0.85) scaleY(1.15)" },
          "100%": { transform: "scaleX(0) scaleY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)" },
        },
        slideUp: {
          "from": { opacity: "0", transform: "translateY(30px)" },
          "to": { opacity: "1", transform: "translateY(0)" },
        },
        countdownPulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
        starFall: {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateY(300px) scale(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
