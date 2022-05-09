module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      '1/4': '25%',
      '1/3': '33%',
      '3/5': '60%',
      '55p': '55%',
      '40p': '40%',
      '100': '25rem',
      '120': '30rem',
      '200': '50rem',
      '300': '75rem'
      // '1000': '100rem',
    },
    extend: {
      inset: {
        "1/6": "16%",
        "-1/10": "-10%",
        "3/5": "60%",
        "1/5": "20%"
      },
      width: {
        '1/5': '20%'
      },
      height: {
        '100': '25rem',
        '110': '27.5rem',
        '120': '30rem',
        '140': '35rem'
      },
      fontFamily: {
        'fira-sans': "Fira Sans",
        "cursive": "cursive",
        "fangsong": "STFangsong"
      },
      boxShadow: {
        "sm-card": "rgb(4 17 29 / 25%) 0px 0px 8px 0px"
      },
      backgroundColor: {
        "light-blue": "rgba(59, 130, 246, 1)",
        "light-blue-300": "rgba(59, 130, 246, 0.3)"
      },
      borderColor: {
        "little-gray": "rgb(229, 232, 235)",
        "light-blue": "rgba(59, 130, 246, 1)"
      },
      padding: {
        "1/10": "10%",
        "1/8": "12%"
      },
      margin: {
        "1/8" : "12%"
      },
      textColor: {
        "light-blue": "rgba(59, 130, 246, 1)"
      },
      marginLeft: {
        "10p": "10%"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
