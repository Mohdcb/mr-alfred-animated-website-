module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,jsx}",
    "./components/**/*.{ts,tsx,jsx}",
    "./app/**/*.{ts,tsx,jsx}",
    "./src/**/*.{ts,tsx,jsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'xs': '300px',     // Extra small screens (small phones)
      'sm': '640px',     // Small screens (default Tailwind breakpoint)
      'md': '768px',     // Medium screens
      'lg': '1024px',    // Added this back since you removed other breakpoints
      'xl': '1280px',    // Added this back since you removed other breakpoints
      '2xl': '1536px',   // Added this back since you removed other breakpoints
    },
    extend: {
      fontFamily: {
        gilroy: ["Gilroy", "sans-serif"],
        "gilroy-b": ["Gilroy-Bold", "sans-serif"],
        "gilroy-sb": ["Gilroy-SemiBold", "sans-serif"],
        "gilroy-m": ["Gilroy-Medium", "sans-serif"],
        "gilroy-bl": ["Gilroy-Black", "sans-serif"],
        "gilroy-r": ["Gilroy", "sans-serif"],
      },
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
    },
  },
  plugins: [
  ],
}