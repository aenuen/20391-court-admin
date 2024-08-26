import Layout from '@/components/Layout'

export const audit = {
  path: '/audit',
  name: 'audit',
  component: Layout,
  redirect: '/audit/create',
  meta: {
    title: '信息审核',
    icon: 'audit'
  },
  children: [
    {
      path: 'organize',
      name: 'auditList',
      component: () => import('@/views/audit/organize'),
      meta: {
        title: '机构审核',
        roles: ['admin']
      }
    }
  ]
}
