export default {
  path: '/cinema',
  component: () => import('@/views/cinema'),
  children: [
    {
      path: 'cinema-list',
      component: () => import('@/components/cinema-list')
    },
    {
      path: '/cinema',
      redirect: '/cinema/cinema-list'
    }
  ]
}
