export default {
  path: '/movie',
  component: () => import('@/views/movie'),
  children: [
    {
      path: 'city',
      component: () => import('@/components/city')
    },
    {
      path: 'now-playing',
      component: () => import('@/components/now-playing')
    },
    {
      path: 'coming-soon',
      component: () => import('@/components/coming-soon')
    },
    {
      path: 'search',
      component: () => import('@/components/search')
    },
    {
      path: '/movie',
      redirect: '/movie/now-playing'
    }
  ]
}
