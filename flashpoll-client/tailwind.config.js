/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "dark":"#000814",
      "darkBlue":"#001D3D",
      "blue":"#003566",
      "darkYellow":"FFC300",
      "yellow":"FFD60A"
    },
  },
  plugins: [],
}