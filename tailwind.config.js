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
        "primary": "#E57373", // Terracotta Accent
        "secondary": "#00A79D", // Teal Accent
        "background-light": "#F8F7F4",
        "background-dark": "#1A1613",
        "card-light": "#EAE8E1",
        "card-dark": "#2C2A26",
        "text-light-primary": "#3D352E",
        "text-light-secondary": "#7E7872",
        "text-dark-primary": "#F8F7F4",
        "text-dark-secondary": "#A9A49E",
        "accent-green": "#4CAF50",
        "accent-orange": "#FF9800",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "heading": ["Poppins", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
