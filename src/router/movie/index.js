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
      path: 'detail/1/:movieId',
      components: {
        default: () => import('@/components/now-playing'),
        detail: () => import('@/views/movie/detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: 'detail/2/:movieId',
      components: {
        default: () => import('@/components/coming-soon'),
        detail: () => import('@/views/movie/detail')
      },
      props: {
        detail: true
      }
    },
    {
      path: '/movie',
      redirect: '/movie/now-playing'
    }
  ]
}
