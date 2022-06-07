// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  theme: {
    defaultTheme: 'myCustomDarkTheme',
    themes: {
      myCustomDarkTheme: {
        dark: true,
        colors: {
          background: '#212121',
          surface: '#212121',
          /* primary: '#6200EE',
          'primary-darken-1': '#D6515A',
          secondary: '#03DAC6',
          'secondary-darken-1': '#018786',
          error: '#B00020',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          blue: '#4D7EA8' */
          'blue-shadow': '#4D7EA8',
          red: '#D6515A',
          'purple-light': '#B8B3D6',
          'purple-dark': '#958FB4',
          cream: '#F0DDD1',
          'piechart-red': '#C15C5C',
          green: '#A7C15C',
          'piechart-purple': '#7C5CC1',
          'piechart-blue': '#5C8BC1',
          ochar: '#C18D5C'

        }
      }
    }
  }
})
