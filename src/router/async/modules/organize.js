import Layout from '@/components/Layout'

export const organize = {
  path: '/organize',
  name: 'organize',
  component: Layout,
  redirect: '/organize/create',
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
    },
    {
      path: 'list',
      name: 'organize-list',
      component: () => import('@/views/organize/list'),
      meta: {
        title: '机构列表',
        roles: ['admin']
      }
    },
    {
      path: 'step',
      name: 'organizeStep',
      component: () => import('@/views/organize/step'),
      meta: {
        title: '认证审核',
        roles: ['shops'],
        activeMenu: '/organize/index' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'success',
      name: 'organizeSuccess',
      component: () => import('@/views/organize/success'),
      meta: {
        title: '准入成功',
        roles: ['shops'],
        activeMenu: '/organize/index' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'view',
      name: 'organizeView',
      component: () => import('@/views/organize/view'),
      meta: {
        title: '认证信息',
        roles: ['shops'],
        activeMenu: '/organize/index' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'look/:id',
      name: 'organizeLook',
      component: () => import('@/views/organize/look'),
      meta: {
        title: '认证信息',
        roles: ['admin'],
        activeMenu: '/audit/organize' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    }
  ]
}
