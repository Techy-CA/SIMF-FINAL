/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#edfcf4',  // lightest tint — bg highlights, success banners
          100: '#d0f7e6',  // light tint — icon backgrounds, soft badges
          200: '#a3eed0',  // soft — borders, dividers
          300: '#6de3b5',  // mid-light — hover accents
          400: '#36cc97',  // mid — focus rings, secondary CTAs
          500: '#2ECC8F',  // SIMF brand green — primary buttons, badges
          600: '#20AA76',  // hover on primary buttons
          700: '#177a55',  // active/pressed state, dark icons
          800: '#115c41',  // deep text variant, header text
          900: '#0c4630',  // darkest — rarely used
        },
        beige: {
          50:  '#faf8f5',
          100: '#f5f0e8',
          200: '#ede4d3',
        },
      },
      fontFamily: {
        inter:   ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        card:      '0 2px 10px rgba(0,0,0,0.06)',
        'card-md': '0 4px 18px rgba(0,0,0,0.09)',
        'card-lg': '0 8px 32px rgba(0,0,0,0.12)',
      },
      screens: {
        xs: '375px', // iPhone SE / small phones — needed for CampaignHero back button
      },
    },
  },
  plugins: [],
};
