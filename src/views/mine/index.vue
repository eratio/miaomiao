<template>
  <div id="main">
    <TopNav title="我的喵喵"></TopNav>
    <div id="content">
      <login></login>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import TopNav from '@/components/topnav'
import TabBar from '@/components/tabbar'
import Login from '@/components/login'

export default {
  name: 'mine',
  components: {
    TopNav,
    TabBar,
    Login
  }
}
</script>

<style scoped>
</style>
