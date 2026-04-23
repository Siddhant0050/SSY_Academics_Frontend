/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Official Udemy Color Palette
        udemyPurple: "#a435f0",   // Primary brand color
        udemyDark: "#1c1d1f",     // Primary text and headings
        udemyGray: "#6a6f73",     // Secondary text and labels
        udemyBg: "#f7f9fa",       // Background for light sections
        udemyBorder: "#d1d7dc",   // Standard border color
        
        // SSY Academics Accents
        ssySuccess: "#1e803e",    // Success/Placement Green
        ssyWarning: "#b4690e",    // Rating/Orange
      },
      fontFamily: {
        // Udemy uses a clean sans-serif stack
        sans: [
          'Inter', 
          'udemy-sans', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          'Roboto', 
          'sans-serif'
        ],
        // Used for the "Billboard" hero text
        serif: [
          'Playfair Display', 
          'Georgia', 
          'serif'
        ],
      },
      boxShadow: {
        // Udemy's distinct subtle shadows
        'udemy': '0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)',
        'udemy-hover': '0 4px 16px rgba(0,0,0,.12)',
      },
      maxWidth: {
        'udemy-container': '1340px', // Standard Udemy page width
      },
      fontSize: {
        'xxs': '10px',
      }
    },
  },
  plugins: [],
}