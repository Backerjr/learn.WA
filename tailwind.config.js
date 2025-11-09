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
        "text-primary-light": "#3D352E",
        "text-primary-dark": "#F8F7F4",
        "text-secondary-light": "#7E7872",
        "text-secondary-dark": "#A9A49E",
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
