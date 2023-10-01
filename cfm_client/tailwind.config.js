/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-menu": "#35057C",
        "purple-drop": "#42069C",
        "card-spending": "#3D156E",
        "card-saving": "#2E127D",
        "wallet-form": "#33146D",
      },
    },
    screens: {
      sssm: "430px",
      //=> @media (min-width: 500px)
      ssm: "500px",
      //=> @media (min-width: 500px)
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1103px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }

      "3xl": "1720px",
      // => @media (min-width: 1536px) { ... }

      "4xl": "1856px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
