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
      path: 'g-look/:id',
      name: 'audit-guarantee-look',
      component: () => import('@/views/guarantee/look'),
      meta: {
        title: '预览订单',
        roles: ['shops'],
        activeMenu: '/audit/guarantee' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'p-look/:id',
      name: 'audit-preserve-look',
      component: () => import('@/views/preserve/look'),
      meta: {
        title: '预览订单',
        roles: ['court'],
        activeMenu: '/audit/preserve' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
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
