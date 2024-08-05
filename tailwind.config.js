import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        avenir: ['"Avenir LT Std"', 'sans-serif'], // Assuming sans-serif as a fallback
        source: ['"Source Sans Pro"', 'sans-serif'], // Assuming 'sans-serif' as a fallback
      },

      colors: {
        customBackground: '#DAAF37',
        buttonlogin: '#DAAF37',
        // backgroundtool: "#DAAF37";
        backgroundColortool: '#949494',

        backgroundgolden: '#DAAF37',

        'black-100': 'rgba(0, 0, 0, 1)',
        'black-50': 'rgba(0, 0, 0, 0.5)',
        'white-100': 'rgba(255, 255, 255, 1)',
        'white-50': 'rgba(255, 255, 255, 0.5)',

        // customBackground: '#f0f0f0', // Replace with your desired color
      },

      backgroundColor: {
        hex: '#262626',
      },
      backgroundImage: {
        // 'model': "url('/ERA1/e1s2.svg')"
      },
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};
