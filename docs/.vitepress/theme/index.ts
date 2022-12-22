import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '../styles/base.css'
import '../styles/vp-modify.css'

import VPDemo from '../components/vp-demo.vue'
console.log(DefaultTheme)
export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus);

    app.component('Demo', VPDemo)
  }
}
