/* eslint-disable no-undef */
// import NotFind from '../pages/errors/404.vue'
// 生产/测试环境，使用路由懒加载
const _import = process.env.NODE_ENV === 'development'
  ? file => require(`@/pages/${file}.vue`).default
  : file => () => System.import(`@/pages/${file}.vue`).then(m => m.default)
export default [
  { path: '/login',
    name: 'Login',
    component: _import('login/index')
  },
  {
    path: '/visual',
    component: resolve => require(['../layout/Layout'], resolve),
    children: [
      {
        path: '',
        name: 'Index',
        component: _import('tourism/index/index')
      }
    ]
  }
]
