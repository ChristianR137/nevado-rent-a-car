import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#DC2626",
                    dark: "#991B1B",
                    light: "#EF4444",
                },
                dark: {
                    DEFAULT: "#0A0A0A",
                    800: "#111111",
                    700: "#1A1A1A",
                    600: "#222222",
                    500: "#2E2E2E",
                },
                surface: "#111111",
                "surface-hover": "#1A1A1A",
                text: {
                    primary: "#FFFFFF",
                    secondary: "#A0A0A0",
                    muted: "#6B7280",
                },
                accent: {
                    green: "#25D366",
                    success: "#10B981",
                    error: "#EF4444",
                    warning: "#F59E0B",
                },
            },
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                serif: ["Playfair Display", "serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-primary":
                    "linear-gradient(135deg, #DC2626 0%, #EF4444 50%, #991B1B 100%)",
                "hero-gradient":
                    "linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.9) 100%)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-in-right": "slideInRight 0.3s ease-out",
                float: "float 3s ease-in-out infinite",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideInRight: {
                    "0%": { opacity: "0", transform: "translateX(20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            boxShadow: {
                "primary-sm": "0 2px 8px rgba(220, 38, 38, 0.15)",
                primary: "0 4px 20px rgba(220, 38, 38, 0.25)",
                "primary-lg": "0 8px 40px rgba(220, 38, 38, 0.35)",
                card: "0 4px 24px rgba(0, 0, 0, 0.4)",
                "card-hover": "0 8px 48px rgba(0, 0, 0, 0.6)",
            },
            borderRadius: {
                "2xl": "1rem",
                "3xl": "1.5rem",
                "4xl": "2rem",
            },
            maxWidth: {
                "8xl": "88rem",
                "9xl": "96rem",
            },
        },
    },
    plugins: [],
};

export default config;
