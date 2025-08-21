/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'seo-green': '#22c55e',
        'seo-red': '#ef4444',
        'seo-yellow': '#f59e0b',
        'google-blue': '#1a73e8',
      }
    },
  },
  plugins: [],
}
