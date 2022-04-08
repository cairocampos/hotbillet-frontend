module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins'],
        'display': ['Poppins'],
        'body': ['Poppins']
      },
      colors: {
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
