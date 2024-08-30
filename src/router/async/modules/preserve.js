import Layout from '@/components/Layout'

export const preserve = {
  path: '/preserve',
  name: 'preserve',
  component: Layout,
  redirect: '/preserve/create',
  meta: {
    title: '保全管理',
    icon: 'preserve',
    roles: ['user', 'manager']
  },
  children: [
    {
      path: 'list',
      name: 'preserveList',
      component: () => import('@/views/preserve/list'),
      meta: {
        title: '保全列表',
        roles: ['user', 'manager']
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
    },
    {
      path: 'details/:id',
      name: 'preserveDetails',
      component: () => import('@/views/preserve/details'),
      meta: {
        title: '担保资料',
        roles: ['user', 'manager'],
        activeMenu: '/preserve/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'upload/:id',
      name: 'preserveUpload',
      component: () => import('@/views/preserve/upload'),
      meta: {
        title: '上传资料',
        roles: ['user', 'manager'],
        activeMenu: '/preserve/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'preview/:id',
      name: 'preservePreview',
      component: () => import('@/views/preserve/preview'),
      meta: {
        title: '预览订单',
        roles: ['user', 'manager'],
        activeMenu: '/preserve/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'look/:id',
      name: 'preserveLook',
      component: () => import('@/views/preserve/look'),
      meta: {
        title: '预览订单',
        roles: ['user', 'manager', 'court'],
        activeMenu: '/audit/preserve' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'audit/:id',
      name: 'preserveAudit',
      component: () => import('@/views/preserve/audit'),
      meta: {
        title: '提交审核',
        roles: ['user', 'manager'],
        activeMenu: '/preserve/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    },
    {
      path: 'select/:id',
      name: 'preserveSelect',
      component: () => import('@/views/preserve/select'),
      meta: {
        title: '选择担保',
        roles: ['user', 'manager'],
        activeMenu: '/preserve/list' // 指定高亮位置
      },
      hidden: true // 不显示在侧边栏中
    }
  ]
}
