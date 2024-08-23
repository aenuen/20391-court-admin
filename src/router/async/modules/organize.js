import Layout from '@/components/Layout'

export const organize = {
  path: '/organize', name: 'organize', component: Layout, redirect: '/organize/create',
  meta: {
    title: '机构信息',
    icon: 'org',
    roles: ['shops']
  },
  children: [
    {
      path: 'index',
      name: 'organizeIndex',
      component: () => import('@/views/organize/index'),
      meta: {
        title: '机构信息',
        roles: ['shops']
      }
    }
  ]
}
