/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { 
      fontFamily: {
      'noto-sans-sc': ['"Noto Sans SC"', 'system-ui'],
      'fredoka': ['"Fredoka"', 'sans-serif'],
    },
  },
  },
  plugins: [],
}

