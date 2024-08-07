import Layout from '@/components/Layout'

const guaranteeRouter = {
  path: '/guarantee', name: 'guarantee', component: Layout, redirect: '/guarantee/create',
  meta: {
    title: '担保管理',
    icon: 'peoples',
    roles: ['guarantee']
  },
  children: [
    {
      path: 'list',
      name: 'guaranteeList',
      component: () => import('@/views/guarantee/list'),
      meta: {
        title: '担保列表',
        roles: ['manager']
      }
    },
    {
      path: 'create',
      name: 'guaranteeCreate',
      component: () => import('@/views/guarantee/create'),
      meta: {
        title: '担保申请',
        roles: ['manager']
      }
    },
    {
      path: 'details/:id',
      name: 'guaranteeDetails',
      component: () => import('@/views/guarantee/details'),
      meta: {
        title: '担保资料',
        roles: ['manager'],
        activeMenu: '/guarantee/create' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    }
  ]
}

export default guaranteeRouter
