/*
 * @Author: aenuen aenuen@qq.com
 * @Date: 2024-08-23 09:32:54
 * @LastEditors: aenuen aenuen@qq.com
 * @LastEditTime: 2024-08-26 14:17:04
 * @FilePath: \court-admin-a1\src\router\async\modules\organize.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
