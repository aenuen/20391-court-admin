import Layout from '@/components/Layout'

export const httpRedirect = {
  path: '/redirect', component: Layout, hidden: true, children: [
    { path: '/redirect/:path(.*)', component: () => import('@/views/aConstant/redirect/http') }
  ]
}

export const login = { path: '/login', component: () => import('@/views/aConstant/account/login'), hidden: true }

export const register = { path: '/register', component: () => import('@/views/aConstant/account/register'), hidden: true }

export const find = { path: '/find', component: () => import('@/views/aConstant/account/find'), hidden: true }

export const authRedirect = { path: '/auth-redirect', component: () => import('@/views/aConstant/redirect/auth'), hidden: true }
