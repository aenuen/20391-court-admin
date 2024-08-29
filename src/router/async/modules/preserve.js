import Layout from '@/components/Layout'

export const preserve = {
  path: '/preserve',
  name: 'preserve',
  component: Layout,
  redirect: '/preserve/create',
  meta: {
    title: '保全管理',
    icon: 'preserve',
    roles: ['user']
  },
  children: [
    {
      path: 'list',
      name: 'preserveList',
      component: () => import('@/views/preserve/list'),
      meta: {
        title: '保全列表',
        roles: ['user']
      }
    },
    {
      path: 'create',
      name: 'preserveIndex',
      component: () => import('@/views/preserve/create'),
      meta: {
        title: '保全申请',
        roles: ['user']
      }
    },
    {
      path: 'details/:id',
      name: 'preserveDetails',
      component: () => import('@/views/preserve/details'),
      meta: {
        title: '担保资料',
        roles: ['user'],
        activeMenu: '/preserve/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    }
  ]
}
