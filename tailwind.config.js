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
        primary: '#FE7700',
        'primary-dark': '#E06B10',
        secondary: '#FBFBFB',
        'secondary-dark': '#FBFBFB',
        dark: '#2F2D2C',
        success: '#00D115',
        'success-dark': '#1B873F',
        info: '#0085FF',
        'info-dark': '#2992C4',
        danger: '#E21E22',
        'danger-dark': '#D1503A',
        light: '#F1F1F1',
        'light-dark': '#D9D9D9',
        'light-light': '#FBFBFB',
        'warning': '#FE7700',
        'warning-dark': '#E21E22'
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
