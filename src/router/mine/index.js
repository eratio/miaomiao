export default {
  path: '/mine',
  component: () => import('@/views/mine'),
  children: [
    {
      path: 'login',
      component: () => import('@/components/login')
    },
    {
      path: '/mine',
      redirect: '/mine/login'
    }
  ]
}
