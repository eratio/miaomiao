<template>
  <div>
    <TopNav title="喵喵院线"></TopNav>
    <div id="content">
      <cinema-list></cinema-list>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TopNav from '@/components/topnav'
import TabBar from '@/components/tabbar'
import CinemaList from '@/components/cinema-list'

export default {
  name: 'cinema',
  components: {
    TopNav,
    TabBar,
    CinemaList
  }
}
</script>

<style scoped>
</style>
