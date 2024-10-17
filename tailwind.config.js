module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        fondogris: '#1d252c',
        titulos: '#a4acbc'
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
