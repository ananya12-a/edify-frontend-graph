import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"

loadFonts()

createApp(App)
  .use(VNetworkGraph)
  .use(router)
  .use(vuetify)
  .mount('#app')
