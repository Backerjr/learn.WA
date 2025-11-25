/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Aurora Studio Palette
        "primary": "#3555FF", // Cobalt action
        "secondary": "#FF7E3D", // Ember accent for contrast
        "background-light": "#0B1020",
        "background-dark": "#050915",
        "card-light": "#0F172A",
        "card-dark": "#0B1220",
        "light-primary": "#0B1020",
        "light-secondary": "#475467",
        "dark-primary": "#E9ECF5",
        "dark-secondary": "#A3ADC2",
        "accent-green": "#1CD1A1",
        "accent-orange": "#F6AA1C",
        "accent-sky": "#74C5F4",
        'space-black': '#050915',
        'neon-teal': '#4FD1C5',
        'holo-silver': '#E9ECF5',
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        // Expressive Grotesk Typography
        "display": ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        "heading": ['"Space Grotesk"', "ui-sans-serif", "system-ui", "sans-serif"],
        "body": ['"Work Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        editorial: ['"Space Grotesk"', 'Georgia', 'serif'], 
        data: ['"Work Sans"', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        "DEFAULT": "12px",
        "sm": "8px",
        "md": "12px",
        "lg": "16px",
        "xl": "20px",
        "2xl": "28px",
        "full": "9999px"
      },
      fontSize: {
        // Editorial type scale
        "xs": ["0.75rem", { lineHeight: "1rem" }], // 12px
        "sm": ["0.875rem", { lineHeight: "1.25rem" }], // 14px
        "base": ["1rem", { lineHeight: "1.5rem" }], // 16px
        "lg": ["1.125rem", { lineHeight: "1.75rem" }], // 18px
        "xl": ["1.25rem", { lineHeight: "1.75rem" }], // 20px
        "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
        "5xl": ["3rem", { lineHeight: "1" }], // 48px
        "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
        "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
        "8xl": ["6rem", { lineHeight: "1" }], // 96px
      },
      spacing: {
        // Editorial spacing scale (8px base unit)
        "18": "4.5rem", // 72px
        "22": "5.5rem", // 88px
        "26": "6.5rem", // 104px
        "30": "7.5rem", // 120px
      },
      letterSpacing: {
        "tighter": "-0.05em",
        "tight": "-0.025em",
        "normal": "0em",
        "wide": "0.025em",
        "wider": "0.05em",
        "widest": "0.1em",
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        pulseNeon: 'pulseNeon 4s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        // Animation for the "Holographic" Pulse
        pulseNeon: {
          '0%, 100%': { opacity: 1, textShadow: '0 0 2px rgba(0, 255, 198, 0.8)' },
          '50%': { opacity: 0.8, textShadow: '0 0 10px rgba(0, 255, 198, 1)' },
        },
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.05)',
      },
      borderColor: {
        'glass-border': 'rgba(255, 255, 255, 0.1)',
      },
      boxShadow: {
        'glass-glow': '0 0 15px rgba(0, 255, 198, 0.5), 0 0 5px rgba(0, 255, 198, 0.2)',
      },
      backdropBlur: {
        'glass': '10px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
