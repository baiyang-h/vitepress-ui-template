import { createApp } from 'vue'
// @ts-ignore
import App from './app.vue'
import JwUi from '../dist/jw-ui'
import '../dist/style.css'

const app = createApp(App)

app.use(JwUi)

app.mount('#app')