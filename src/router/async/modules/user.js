import Layout from '@/components/Layout'

export const user = {
  path: '/user', name: 'user', component: Layout, redirect: '/user/create',
  meta: {
    title: '用户管理',
    icon: 'user',
    roles: ['admin']
  },
  children: [
    {
      path: 'list',
      name: 'userList',
      component: () => import('@/views/user/list'),
      meta: {
        title: '用户列表',
        roles: ['admin']
      }
    },
    {
      path: 'create',
      name: 'userCreate',
      component: () => import('@/views/user/create'),
      meta: {
        title: '用户创建',
        roles: ['admin']
      }
    },
    {
      path: 'update/:id',
      name: 'userUpdate',
      component: () => import('@/views/user/update'),
      meta: {
        title: '用户编辑',
        roles: ['admin'],
        activeMenu: '/user/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    }
  ]
}
