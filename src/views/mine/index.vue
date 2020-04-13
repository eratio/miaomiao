<template>
  <div id="main">
    <TopNav title="我的喵喵"></TopNav>
    <div id="content">
       <router-view></router-view>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TopNav from '@/components/topnav'
import TabBar from '@/components/tabbar'

export default {
  name: 'mine',
  components: {
    TopNav,
    TabBar
  }
}
</script>

<style scoped>
</style>
