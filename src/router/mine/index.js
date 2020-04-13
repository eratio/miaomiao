export default {
  path: '/mine',
  component: () => import('@/views/mine'),
  children: [
    {
      path: 'center',
      component: () => import('@/views/mine/center')
    },
    {
      path: 'login',
      component: () => import('@/components/login')
    },
    {
      path: 'register',
      component: () => import('@/components/register')
    },
    {
      path: 'update-password',
      component: () => import('@/components/update-password')
    },
    {
      path: '/mine',
      redirect: '/mine/center'
    }
  ]
}
