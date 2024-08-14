import Layout from '@/components/Layout'

export const dict = {
  path: '/dict', name: 'dict', component: Layout, redirect: '/dict/create',
  meta: {
    title: '字典管理',
    icon: 'peoples'
  },
  children: [
    {
      path: 'list',
      name: 'dictList',
      component: () => import('@/views/dict/list'),
      meta: {
        title: '字典管理'
      }
    }
  ]
}
