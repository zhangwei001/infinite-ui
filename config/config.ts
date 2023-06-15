const pxToRem = require('postcss-pxtorem')

export default {
  mode: 'site',
  title: 'Infinite UI',
  favicon: 'https://img.alicdn.com/imgextra/i4/O1CN01tBzc8l1qzjccvviyt_!!6000000005567-55-tps-200-200.svg',
  navs: [
    {
      title: '组件',
      path: '/components',
    },
    {
      title: '更新日志',
      path: '/changelog.html',
    },
    {
      title: 'PC组件',
      path: 'https://infinite-ui.alibaba-inc.com/web-components/button.html',
    },
    {
      title: '配套脚手架',
      path: 'http://gitlab.alibaba-inc.com/lzdbase/lzd-toolkit-basic',
    },
    {
      title: '反馈建议',
      path: 'http://gitlab.alibaba-inc.com/infinite-ui/infinite-ui/issues',
    }
  ],
  menus: {
    '/': [
      {
        title: '首页',
        path: 'index',
      },
    ],
    '/components': [
      {
        title: '基础',
        children: [
          '/components/autocomplete',
          '/components/action-sheet',
          '/components/arise-loading',
          '/components/button',
          '/components/checkbox',
          '/components/dialog',
          '/components/ellipsis',
          '/components/icon',
          '/components/list',
          '/components/image',
          '/components/image-viewer',
          '/components/input',
          '/components/loading',
          '/components/mask',
          '/components/message',
          '/components/picker',
          '/components/popover',
          '/components/popup',
          '/components/progress-bar',
          '/components/radio',
          '/components/rate',
          '/components/safe-area',
          '/components/scroll',
          '/components/select',
          '/components/slider',
          '/components/slipbar',
          '/components/space',
          '/components/stepper',
          '/components/steps',
          '/components/swipe-cell',
          '/components/switch',
          '/components/tabs',
          '/components/tab-swiper',
          '/components/text-area',
          '/components/toast',
          '/components/toggle',
          '/components/video',
        ],
      },
      {
        title: '导航和布局',
        children: [
          '/components/divider',
        ],
      },
      {
        title: '功能组件',
        children: [
          '/components/error-boundary',
          '/components/exposure',
        ],
      },
    ],
  },
  resolve: {
    includes: ['docs', 'src'],
    passivePreview: true,
  },
  alias: {
    'infinite-ui/lib/index.less': process.cwd() + '/src/index.less',
    'demos': process.cwd() + '/src/demos/index.ts',
    'components': process.cwd() + '/src/index.ts'
  },
  exportStatic: {
    htmlSuffix: true,
    dynamicRoot: true,
  },
  copy: [
    {
      from: 'theme/arise.css',
      to: 'theme/arise.css',
    },
    {
      from: 'theme/default.css',
      to: 'theme/default.css',
    },
    {
      from: '.dumi/theme/fonts/EuclidCircularA-Bold.woff2',
      to: 'static/fonts/EuclidCircularA-Bold.woff2', 
    },
    {
      from: '.dumi/theme/fonts/EuclidCircularA-Medium.woff2',
      to: 'static/fonts/EuclidCircularA-Medium.woff2', 
    },
    {
      from: '.dumi/theme/fonts/EuclidCircularA-Regular.woff2',
      to: 'static/fonts/EuclidCircularA-Regular.woff2', 
    },
    {
      from: '.dumi/theme/fonts/EuclidCircularA-Semibold.woff2',
      to: 'static/fonts/EuclidCircularA-Semibold.woff2', 
    },


  ],

  styles: [
    `
    #root .__dumi-default-mobile-demo-layout {
      padding: 0;
    }
    `,
  ],
  extraPostCSSPlugins: [
    // pxToRem({
    //   // rootValue: 15,
    //   propList: ['*'],
    // }),
  ],
}
