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
        // RozmoWA Editorial Palette
        "primary": "#000000", // Black - Primary actions, editorial feel
        "secondary": "#71717A", // Zinc-500 - Secondary text and elements
        "background-light": "#FFFFFF", // Pure white
        "background-dark": "#000000", // Pure black
        "card-light": "#FAFAFA", // Zinc-50 - Subtle card backgrounds
        "card-dark": "#18181B", // Zinc-900 - Dark mode cards
        "text-light-primary": "#000000", // Black text
        "text-light-secondary": "#71717A", // Zinc-500 - Secondary text
        "text-dark-primary": "#FAFAFA", // Zinc-50 - Dark mode primary text
        "text-dark-secondary": "#A1A1AA", // Zinc-400 - Dark mode secondary
        "accent-green": "#000000", // Changed to black for consistency
        "accent-orange": "#000000", // Changed to black for consistency
        
        // Holographic Palette for LandingPortal
        'space-black': '#000000',
        'neon-teal': '#00FFC6',
        'holo-silver': '#E0E0E0',
        
        // Additional editorial colors
        "zinc": {
          50: "#FAFAFA",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
        },
      },
      fontFamily: {
        // Editorial Typography
        "display": ["Inter", "system-ui", "-apple-system", "sans-serif"], // Clean sans for UI
        "heading": ["ui-serif", "Georgia", "Cambria", "Times New Roman", "serif"], // Serif for headings
        "body": ["Inter", "system-ui", "-apple-system", "sans-serif"], // Sans for body
        // Custom Fonts for LandingPortal
        editorial: ['"Playfair Display"', 'Georgia', 'serif'], 
        data: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        // Sharp, editorial feel
        "DEFAULT": "2px", // Minimal radius
        "sm": "2px",
        "md": "2px",
        "lg": "2px", // Override to 2px for Swiss design
        "xl": "4px", // Slightly more for special cases
        "2xl": "8px",
        "full": "9999px" // Keep full for circles
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
