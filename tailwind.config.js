/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2.5rem",
              fontWeight: "700",
              marginTop: "2rem",
              marginBottom: "1rem",
              lineHeight: "1.2",
              color: "hsl(var(--foreground))",
            },
            h2: {
              fontSize: "2rem",
              fontWeight: "600",
              marginTop: "1.75rem",
              marginBottom: "0.75rem",
              lineHeight: "1.3",
              color: "hsl(var(--foreground))",
            },
            h3: {
              fontSize: "1.75rem",
              fontWeight: "600",
              marginTop: "1.5rem",
              marginBottom: "0.75rem",
              lineHeight: "1.4",
              color: "hsl(var(--foreground))",
            },
            h4: {
              fontSize: "1.5rem",
              fontWeight: "600",
              marginTop: "1.25rem",
              marginBottom: "0.5rem",
              lineHeight: "1.5",
              color: "hsl(var(--foreground))",
            },
            h5: {
              fontSize: "1.25rem",
              fontWeight: "600",
              marginTop: "1rem",
              marginBottom: "0.5rem",
              lineHeight: "1.6",
              color: "hsl(var(--foreground))",
            },
            h6: {
              fontSize: "1rem",
              fontWeight: "600",
              marginTop: "0.75rem",
              marginBottom: "0.5rem",
              lineHeight: "1.6",
              color: "hsl(var(--foreground))",
            },
          },
        },
      },
      fontFamily: {
        sans: ["'Pretendard'", "var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        pretendard: ["'Pretendard'", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
