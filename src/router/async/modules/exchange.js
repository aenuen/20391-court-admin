import Layout from '@/components/Layout'

export const exchange = {
  path: '/exchange',
  name: 'exchange',
  component: Layout,
  redirect: '/exchange/create',
  meta: {
    title: '汇率管理',
    icon: 'money',
    roles: ['manager']
  },
  children: [
    {
      path: 'list',
      name: 'exchange-list',
      component: () => import('@/views/exchange/list'),
      meta: {
        title: '汇率管理',
        icon: 'money',
        roles: ['manager']
      }
    }
  ]
}
