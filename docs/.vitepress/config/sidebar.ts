const sidebarGuide = [
  {
    text: '基础',
    items: [
      {text: '设计', link: '/guide/design'},
      {text: '导航', link: '/guide/nav'},
      {text: '安装', link: '/guide/installation'},
      {text: '快速开始', link: '/guide/quickstart'},
    ]
  },
  {
    text: '高级',
    items: [
      {text: '主题', link: '/guide/theming'},
    ]
  },
]

const sidebarComponent = [
  {
    text: '通用组件',
    items: [
      {text: 'Table', link: '/component/common/table'},
      {text: 'Form', link: '/component/common/form'},
      {text: 'Dialog', link: '/component/common/dialog'},
    ]
  },
  {
    text: '业务组件',
    collapsible: true,
    collapsed: true,
    items: [
      {text: '配置规则组件', link: '/component/service/configure-rule'},
    ]
  }
]

const sidebarTool = [
  {
    text: '方法',
    items: [
      {text: '类型判断', link: '/tool/method/type'},
      {text: '下载', link: '/tool/method/download'},
    ]
  },
]

const sidebar = {
  '/guide/': sidebarGuide,
  '/component/': sidebarComponent,
  '/tool/': sidebarTool,
}

export default sidebar
