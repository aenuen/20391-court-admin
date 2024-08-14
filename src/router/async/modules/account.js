import Layout from '@/components/Layout'

export const account = {
  path: '/account',
  component: Layout,
  children: [
    {
      path: 'data', name: 'accountData', component: () => import('@/views/aConstant/account/data.vue'),
      meta: {
        title: '账号资料'
      },
      hidden: true
    }
  ]
}
