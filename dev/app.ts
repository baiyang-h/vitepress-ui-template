import { createApp } from 'vue'
// @ts-ignore
import App from './app.vue'
import myPlugin from '../es'
const app = createApp(App)

app.use(myPlugin)

app.mount('#app')