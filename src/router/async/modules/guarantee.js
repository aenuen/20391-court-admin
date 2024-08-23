import Layout from '@/components/Layout'

export const guarantee = {
  path: '/guarantee', name: 'guarantee', component: Layout, redirect: '/guarantee/create',
  meta: {
    title: '担保管理',
    icon: 'guarantee'
  },
  children: [
    {
      path: 'list',
      name: 'guaranteeList',
      component: () => import('@/views/guarantee/list'),
      meta: {
        title: '担保列表',
        roles: ['user']
      }
    },
    {
      path: 'create',
      name: 'guaranteeCreate',
      component: () => import('@/views/guarantee/create'),
      meta: {
        title: '担保申请',
        roles: ['user']
      }
    },
    {
      path: 'details/:id',
      name: 'guaranteeDetails',
      component: () => import('@/views/guarantee/details'),
      meta: {
        title: '担保资料',
        roles: ['user'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'upload/:id',
      name: 'guaranteeUpload',
      component: () => import('@/views/guarantee/upload'),
      meta: {
        title: '上传资料',
        roles: ['user'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'select/:id',
      name: 'guaranteeSelect',
      component: () => import('@/views/guarantee/select'),
      meta: {
        title: '选择担保机构',
        roles: ['user'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'preview/:id',
      name: 'guaranteePreview',
      component: () => import('@/views/guarantee/preview'),
      meta: {
        title: '预览订单',
        roles: ['user'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'audit/:id',
      name: 'guaranteeAudit',
      component: () => import('@/views/guarantee/audit'),
      meta: {
        title: '提交审核',
        roles: ['user'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    }
  ]
}
