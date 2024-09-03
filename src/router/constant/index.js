import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 固定加载
import { home } from './modules/home'
import { guide, login, register, find, httpRedirect, authRedirect } from './modules/account'
import { error401, error404 } from './modules/errorPage'

export const constantRoutes = [
  guide, // 引导页
  login, // 登录
  register, // 注册
  find, // 找回密码
  authRedirect, // 身份重定向
  httpRedirect, // 网址重定向
  error401, // 401页面
  error404, // 404页面
  home // 首页
]

const createRouter = () => new Router({ scrollBehavior: () => ({ y: 0 }), routes: constantRoutes })
const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
