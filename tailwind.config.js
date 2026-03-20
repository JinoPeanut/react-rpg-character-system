/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
          },
          '50%': {
            boxShadow: '0 0 20px rgba(255, 255, 255, 1)'
          }
        }
      },
      animation: {
        glow: 'glow 1.5s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

