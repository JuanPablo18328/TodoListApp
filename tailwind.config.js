/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'colorBtn': '#747bff',
          'colorBtnHover': '#5c62cc',
        },
      },
    },
    plugins: [],
  }
  
  