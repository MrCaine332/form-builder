const plugin = require("tailwindcss/plugin")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    fontFamily: {
      // "sans": ["JosefinSans"]
    },
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        /** Global colors */
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",

        primary: {
          background: "rgb(var(--primary-background))",
          foreground: "rgb(var(--primary-foreground))",
        },

        secondary: {
          background: "rgb(var(--secondary-background))",
          foreground: "rgb(var(--secondary-foreground))",
        },

        accent: {
          background: "rgb(var(--accent-background))",
          foreground: "rgb(var(--accent-foreground))",
        },

        muted: {
          background: "rgb(var(--muted-background))",
          foreground: "rgb(var(--muted-foreground))",
        },

        destructive: "rgb(var(--destructive))",
        success: "rgb(var(--success))",
        warning: "rgb(var(--warning))",
        info: "rgb(var(--info))",

        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",

        section: {
          background: "rgb(var(--section-background))",
          foreground: "rgb(var(--section-foreground))",
        },

        card: {
          background: "rgb(var(--card-background))",
          foreground: "rgb(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        dark: "0 0 4px 2px rgba(0, 0, 0, 0.15)",
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
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant("firefox", ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: "-moz-document",
          params: "url-prefix()",
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`
        })
      })
    }),
  ],
}
