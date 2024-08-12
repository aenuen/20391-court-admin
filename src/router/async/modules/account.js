import Layout from '@/components/Layout'

const accountRouter = {
  path: '/account',
  component: Layout,
  children: [
    {
      path: 'index', name: 'accountIndex', component: () => import('@/views/aConstant/account/index.vue'),
      meta: {
        title: '账号资料'
      },
      hidden: true
    }
  ]
}

export default accountRouter
