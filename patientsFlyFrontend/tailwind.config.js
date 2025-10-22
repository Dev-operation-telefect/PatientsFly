/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    fontFamily: {
      onetext: ['Dancing Script', 'cursive'],

    },
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'main-color': '#114a74',
      'main-hover': '#136099',
      
      'sec-color': '#a83417',
      'sec-hover': '#cb330d',
      'three-color': '#026576',
      'text-color': '#292929',
      'text-black': '#000',
      'red': '#f3053c',
      'red-hover': '#dd083a',
      'darkBG': '#202020',
    },
    
  },
  plugins: [
    require('flowbite/plugin')
  ]
}
