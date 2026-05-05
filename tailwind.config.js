module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg0:      "#020810",
        bg1:      "#030F1A",
        bg2:      "#041525",
        cyan:     "#00E5FF",
        cyanDim:  "rgba(0,229,255,0.5)",
        danger:   "#FF3278",
        poison:   "#39FF14",
        txt:      "#D8F4FF",
        txtMid:   "rgba(216,244,255,0.45)",
        txtDim:   "rgba(216,244,255,0.18)",
        txtGhost: "rgba(216,244,255,0.06)",
      },
      fontFamily: {
        mono: ["'Share Tech Mono'", "'Courier New'", "monospace"],
        sans: ["Rajdhani", "sans-serif"],
      },
      animation: {
        "flicker":   "flicker 12s infinite",
        "pulse-dot": "pulse-dot 2.5s ease-in-out infinite",
        "scan-line": "scan-line 4s linear infinite",
        "fade-up":   "fade-up 0.35s ease forwards",
        "sheet-up":    "sheet-up    0.3s cubic-bezier(0.32,0.72,0,1) forwards",
        "sheet-down":  "sheet-down  0.3s cubic-bezier(0.32,0.72,0,1) forwards",
        "sheet-left":  "sheet-left  0.3s cubic-bezier(0.32,0.72,0,1) forwards",
        "sheet-right": "sheet-right 0.3s cubic-bezier(0.32,0.72,0,1) forwards",
        "roll-spin": "roll-spin 0.4s ease-out",
      },
      keyframes: {
        flicker: {
          "0%,100%": { opacity: "1" },
          "92%":     { opacity: "1" },
          "93%":     { opacity: "0.8" },
          "94%":     { opacity: "1" },
          "96%":     { opacity: "0.9" },
          "97%":     { opacity: "1" },
        },
        "pulse-dot": {
          "0%,100%": { opacity: "0.6", boxShadow: "0 0 4px currentColor" },
          "50%":     { opacity: "1",   boxShadow: "0 0 10px currentColor, 0 0 20px currentColor" },
        },
        "scan-line": {
          "0%":   { top: "0%",   opacity: "0" },
          "5%":   { opacity: "0.6" },
          "95%":  { opacity: "0.6" },
          "100%": { top: "100%", opacity: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-up": {
          from: { transform: "translateY(100%)" },
          to:   { transform: "translateY(0)" },
        },
        "sheet-down": {
          from: { transform: "translateY(-100%)" },
          to:   { transform: "translateY(0)" },
        },
        "sheet-left": {
          from: { transform: "translateX(-100%)" },
          to:   { transform: "translateX(0)" },
        },
        "sheet-right": {
          from: { transform: "translateX(100%)" },
          to:   { transform: "translateX(0)" },
        },
        "roll-spin": {
          "0%":   { transform: "rotate(0deg) scale(1)" },
          "50%":  { transform: "rotate(180deg) scale(1.1)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
