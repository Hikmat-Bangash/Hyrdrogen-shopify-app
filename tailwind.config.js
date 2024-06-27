import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'avenir': ['"Avenir LT Std"', 'sans-serif'], // Assuming sans-serif as a fallback
        'source': ['"Source Sans Pro"', 'sans-serif'] // Assuming 'sans-serif' as a fallback

      },

      colors: {
        customBackground: "#DAAF37",
        buttonlogin: "#DAAF37",
        // backgroundtool: "#DAAF37";
        backgroundColortool: "#949494",

        backgroundgolden: "#DAAF37",



        // customBackground: '#f0f0f0', // Replace with your desired color
      },

      backgroundColor: {
        'hex': '#262626',

      },
      backgroundImage: {
        // 'model': "url('/ERA1/e1s2.svg')"
      }
    },
  },
  plugins: [formsPlugin, typographyPlugin],
};


// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         customBackground: "#DAAF37",
//         buttonlogin: "#DAAF37",
//         // backgroundtool: "#DAAF37";
//         backgroundColortool: "#949494",


//         // customBackground: '#f0f0f0', // Replace with your desired color
//       },

//       backgroundColor: {
//         'hex': '#262626',

//       },
//       backgroundImage: {
//         // 'model': "url('/ERA1/e1s2.svg')"
//       }
//     },
//   },
//   plugins: [require("daisyui")],
// };

// // import "./public/ERA1/e1s2.svg"