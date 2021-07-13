// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import "@/utils/rem.js"
// layouts 不好搞客户端路由，Layout 中的公共资源没必要反复加载；所以使用 App.vue 来定义 Layout。
// import DefaultLayout from '~/layouts/Default.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/layout.css'
import './style/page.css'
import './style/markdown.css'

export default function (Vue, { router, head, isClient }) {

  // 注册全部组件：在此位置注册插件
  Vue.use(ElementUI);

  Vue.config.errorHandler = (err, vm, info) => {
    console.log('进来啦~');
    console.log('err：', err);
    console.log('vm：', vm);
    console.log('info：', info);

  }

  // Set default layout as a global component
  // Vue.component('Layout', DefaultLayout)
}
