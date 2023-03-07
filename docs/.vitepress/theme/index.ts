import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import '../styles/index.scss'

import VPDemo from '../components/vp-demo.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus, {
      locale
    });

    app.component('Demo', VPDemo)
  }
}
