import Layout from '@/components/Layout'

const accountRouter = {
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

export default accountRouter
