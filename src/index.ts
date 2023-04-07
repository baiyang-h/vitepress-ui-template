import './style/index.scss'

import installer from './installer'

export * from '@/components'
export * as components from '@/components';

export const install = installer.install
export const version = installer.version
export default installer