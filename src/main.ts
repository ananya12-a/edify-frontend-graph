import { createApp } from 'vue'
import App from './App.vue'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import VNetworkGraph from "v-network-graph"
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import "v-network-graph/lib/style.css"

loadFonts()

createApp(App)
  .use(VNetworkGraph)
  .use(router)
  .use(PrimeVue)
  .component('Dialog', Dialog)
  .component('p-button', Button)
  .mount('#app')