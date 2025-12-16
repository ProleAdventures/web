import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
        // Unsolved Mysteries Design System
        primary: {
          50: "rgba(255, 255, 255, 0.08)",
          100: "rgba(255, 255, 255, 0.15)",
          300: "rgba(255, 255, 255, 0.25)",
          500: "rgba(255, 255, 255, 0.4)",
          700: "rgba(134, 239, 172, 0.8)",
        },
        background: {
          primary: "#000000",
          secondary: "#000000", 
          tertiary: "#000000",
        },
        neutral: {
          50: "rgba(229, 229, 229, 0.98)",   // #e5e5e5 - Primary text (soft grey)
          100: "rgba(192, 192, 192, 0.95)",  // #c0c0c0 - Secondary text (medium grey)
          200: "rgba(160, 160, 160, 0.92)",  // #a0a0a0 - Muted text (darker grey)
          300: "rgba(128, 128, 128, 0.88)",  // #808080 - Teriary text
          500: "rgba(96, 96, 96, 0.82)",     // #606060 - Disabled text
          700: "rgba(64, 64, 64, 0.75)",     // #404040 - Very muted
        },
        dark: {
          100: "rgba(42, 42, 42, 0.7)",      // #2a2a2a - Card/panel base
          200: "rgba(52, 52, 52, 0.8)",      // #343434 - Elevated elements
          300: "rgba(62, 62, 62, 0.6)",      // #3e3e3e - Subtle elements
        },
        investigation: {
          primary: "#10b981",
          secondary: "#f59e0b", 
          accent: "#3b82f6",
        },
        text: {
          primary: "rgba(229, 229, 229, 0.98)",   // #e5e5e5 - Primary text
          secondary: "#10b981",                     // #10b981 - Secondary text (dark green)
          muted: "rgba(192, 192, 192, 0.95)",     // #c0c0c0 - Muted text
        },
        semantic: {
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        'gradient-atmospheric': '#000000',
        'gradient-depth': '#000000', 
        'gradient-investigation': '#000000',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        'sm': "8px",
        'md': "12px", 
        'lg': "16px",
        'xl': "24px",
      },
      fontFamily: {
        display: ["'Orbitron'", "'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "'SF Pro Text'", "system-ui", "sans-serif"],
        mono: ["'Fira Code'", "'SF Mono'", "monospace"],
      },
      fontSize: {
        'xs': "12px",
        'sm': "14px", 
        'base': "16px",
        'lg': "18px",
        'xl': "20px",
        '2xl': "24px",
        '3xl': "32px",
        '4xl': "48px",
        '5xl': "64px",
      },
      spacing: {
        '1': "4px",
        '2': "8px",
        '3': "12px",
        '4': "16px",
        '6': "24px",
        '8': "32px",
        '12': "48px",
        '16': "64px",
        '24': "96px",
        '32': "128px",
      },
      boxShadow: {
        'glass': "0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        'elevated': "0 16px 64px rgba(0, 0, 0, 0.8)",
        'subtle': "0 4px 16px rgba(0, 0, 0, 0.5)",
        'investigation': "0 0 20px rgba(16, 185, 129, 0.3)",
      },
      backdropBlur: {
        '20': "20px",
        '40': "40px",
        '12': "12px",
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          'from': { 
            boxShadow: '0 0 5px rgba(16, 185, 129, 0.5)' 
          },
          'to': { 
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)' 
          },
        },
        'pulse-slow': {
          '0%, 100%': { 
            opacity: '0.8',
            transform: 'scale(1)',
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.05)',
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config