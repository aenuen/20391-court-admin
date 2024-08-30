import Layout from '@/components/Layout'

export const audit = {
  path: '/audit',
  name: 'audit',
  component: Layout,
  redirect: '/audit/create',
  meta: {
    title: '信息审核',
    icon: 'audit',
    roles: ['manager', 'shops', 'court']
  },
  children: [
    {
      path: 'organize',
      name: 'auditOrganize',
      component: () => import('@/views/audit/organize'),
      meta: {
        title: '机构审核',
        icon: 'audit',
        roles: ['manager']
      }
    },
    {
      path: 'guarantee',
      name: 'auditGuarantee',
      component: () => import('@/views/audit/guarantee'),
      meta: {
        title: '担保审核',
        icon: 'audit',
        roles: ['shops']
      }
    },
    {
      path: 'court',
      name: 'auditCourt',
      component: () => import('@/views/audit/court'),
      meta: {
        title: '法院审核',
        icon: 'audit',
        roles: ['manager']
      }
    },
    {
      path: 'preserve',
      name: 'audit-preserve',
      component: () => import('@/views/audit/preserve'),
      meta: {
        title: '保全审核',
        icon: 'audit',
        roles: ['court']
      }
    }
  ]
}
