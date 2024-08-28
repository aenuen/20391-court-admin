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
    }
  ]
}
