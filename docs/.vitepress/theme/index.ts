import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VPDemo from '../components/vp-demo.vue'

export default {
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus);

    // app.component('Demo', VPDemo)
  }
}