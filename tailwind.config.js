/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,css,js'],
  theme: {
    extend: {
      fontFamily: {
        'tungsten': ['Tungsten', 'sans-serif'],
        'raleway': ['raleway', 'sans-serif']
      },
      fontSize: {
        'h5': '48px',
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
        'inseec-red': '#EE2D28'
      },
      maxWidth: {
        'preform-fieldset-w': '800px'
      },
      height: {
        'responsive': '70vh',
        'preform-fieldset-h': '400px'
      },
      width: {
        'preform-fieldset-w': '800px',
        'auto': 'auto'
      },
      boxShadow: {
        'fieldset-shadow': '0 8px 16px -5px rgba(0,0,0,0.15)'
      }
    }
  },
  plugins: []
}

