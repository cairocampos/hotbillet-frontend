module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins'],
        'display': ['Poppins'],
        'body': ['Poppins']
      },
      colors: {
        'base-dark': '#494545',
        'base': '#2F2D2C',
        'base-light': '#787676',
        primary: {
          300: "#0085FF",
          400: "#0085FF",
          500: "#0085FF"
        },
        success: {
          300: "#00D115",
          400: "#00D115",
          500: "#00D115"
        },
        danger: {
          300: "#E21E22",
          400: "#E21E22",
          500: "#E21E22"
        },
        warning: {
          300: "#FE7700",
          400: "#FE7700",
          500: "#FE7700"
        },
        dark: {
          300: "#787676",
          400: "#494545",
          500: "#2F2D2C"
        },
        light: {
          200: "#FFFFFF",
          300: "#FBFBFB",
          400: "#F1F1F1",
          500: "#D9D9D9"
        }
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['hover','focus']
    },
  },
  plugins: [],
}
