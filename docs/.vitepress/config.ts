import { defineConfig } from 'vitepress'
import nav from './config/nav'
import sidebar from './config/sidebar'
import VitePressPluginDemoBlockPlus from './plugins/vitepress-plugin-demoblock-plus'

export default defineConfig({
  title: '测试',
  description: '测试一下',
  themeConfig: {
    logo: '/images/logo.png',
    nav,
    sidebar
  },
  markdown: {
    config: (md) => {
      VitePressPluginDemoBlockPlus(md)
    }
  }
})
