import Layout from '@/components/Layout'

export const guarantee = {
  path: '/guarantee',
  name: 'guarantee',
  component: Layout,
  redirect: '/guarantee/create',
  meta: {
    title: '担保管理',
    icon: 'guarantee',
    roles: ['user', 'manager']
  },
  children: [
    {
      path: 'list',
      name: 'guaranteeList',
      component: () => import('@/views/guarantee/list'),
      meta: {
        title: '担保列表',
        roles: ['user', 'manager']
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
        roles: ['user', 'manager'],
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
        roles: ['user', 'manager'],
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
        roles: ['user', 'manager'],
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
        roles: ['user', 'manager'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'look/:id',
      name: 'guaranteeLook',
      component: () => import('@/views/guarantee/look'),
      meta: {
        title: '预览订单',
        roles: ['user', 'manager'],
        activeMenu: '/audit/guarantee' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'audit/:id',
      name: 'guaranteeAudit',
      component: () => import('@/views/guarantee/audit'),
      meta: {
        title: '提交审核',
        roles: ['user', 'manager'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'pay/:id',
      name: 'guaranteePay',
      component: () => import('@/views/guarantee/pay'),
      meta: {
        title: '支付订单',
        roles: ['user', 'manager'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'fees/:id',
      name: 'guaranteeFees',
      component: () => import('@/views/guarantee/fees'),
      meta: {
        title: '缴费确认',
        roles: ['user', 'manager'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'sweat/:id',
      name: 'guaranteeSweat',
      component: () => import('@/views/guarantee/sweat'),
      meta: {
        title: '等待出函',
        roles: ['user', 'manager'],
        activeMenu: '/guarantee/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    }
  ]
}
