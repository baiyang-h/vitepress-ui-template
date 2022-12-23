import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import '../styles/index.scss'

import VPDemo from '../components/vp-demo.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus);

    app.component('Demo', VPDemo)
  }
}
