import Layout from '@/components/Layout'

export const court = {
  path: '/court',
  name: 'court',
  component: Layout,
  redirect: '/court/create',
  meta: {
    title: '法院信息',
    icon: 'org',
    roles: ['court']
  },
  children: [
    {
      path: 'index',
      name: 'courtIndex',
      component: () => import('@/views/court/index'),
      meta: {
        title: '法院信息',
        roles: ['court']
      }
    },
    {
      path: 'step',
      name: 'courtStep',
      component: () => import('@/views/court/step'),
      meta: {
        title: '认证审核',
        roles: ['court'],
        activeMenu: '/court/index' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'success',
      name: 'courtSuccess',
      component: () => import('@/views/court/success'),
      meta: {
        title: '准入成功',
        roles: ['court'],
        activeMenu: '/court/index' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'view',
      name: 'courtView',
      component: () => import('@/views/court/view'),
      meta: {
        title: '认证信息',
        roles: ['court'],
        activeMenu: '/court/index' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'look/:id',
      name: 'courtLook',
      component: () => import('@/views/court/look'),
      meta: {
        title: '认证信息',
        roles: ['admin'],
        activeMenu: '/audit/court' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    }
  ]
}
