/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,css,js}'],
  theme: {
    extend: {
      fontFamily: {
        'inseecu': ['inseec-u-medium', 'sans-serif'],
        'inter': ['Inter', 'sans-serif']
      },
      fontSize: {
        'h5': '32px',
        'h6': '20px',
        'button': '16px',
        'p': '16px',
        'point': '28px',
      },
      padding: {
        'button-x': '2em',
        'button-y': '1em'
      },
      colors: {
        'inseec-purple': '#5D0282'
      },
      maxWidth: {
        'preform-fieldset-w': '800px'
      },
      height: {
        'responsive': '70vh',
        'preform-fieldset-h': '400px',
        'calc-fieldset-h': 'calc(400px - 64px)'
      },
      width: {
        'preform-fieldset-w': '800px',
        'sm-calc-fieldset-w': 'calc(100% - 50px)',
        'md-calc-fieldset-w': 'calc(100% - 150px)',
        'auto': 'auto'
      },
      boxShadow: {
        'fieldset-shadow': '0 0 16px -5px rgba(0,0,0,0.15)'
      },
      translate: {
        'slide-1': 'calc(800px + 96px)'
      },
      borderRadius: {
        'button': '50px'
      }
    }
  },
  plugins: []
}
