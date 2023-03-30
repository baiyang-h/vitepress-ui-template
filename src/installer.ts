import type { App, Plugin } from 'vue';
import { version } from '../package.json';
import * as components from '@/components'

const install = (app: App, options) => {
  // app.provide(xxxx, options);
  if(components) {
    (Array.isArray(components) ? components : Object.values(components)).forEach(plugin => {
      app.use(plugin as Plugin, options);
    })
  }
}
export default {
  version,
  install
}