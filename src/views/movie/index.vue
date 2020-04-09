<template>
  <div id="main">
    <TopNav title="喵喵电影"></TopNav>
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name">
          <span>{{ $store.state.city.nm }}</span><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_switch">
          <router-link tag="div" to="/movie/now-playing" class="hot_item">正在热映</router-link>
          <router-link tag="div" to="/movie/coming-soon" class="hot_item">即将上映</router-link>
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <TabBar></TabBar>
    <router-view name="detail" />
  </div>
</template>

<script>
import TopNav from '@/components/topnav'
import TabBar from '@/components/tabbar'
import { msgBox } from '@/components/js'

export default {
  name: 'movie',
  components: {
    TopNav,
    TabBar
  },
  mounted () {
    setTimeout(() => {
      this.axios.get('/api/getLocation').then((res) => {
        const msg = res.data.msg
        if (msg === 'ok') {
          const nm = res.data.data.nm
          const id = res.data.data.id
          if (this.$store.state.city.id === id) {
            return
          }
          const that = this
          msgBox({
            title: '定位',
            content: nm,
            cancel: '取消',
            ok: '切换定位',
            handleOk () {
              that.$store.commit('city/CITY_INFO', { nm, id })
              window.localStorage.setItem('nowNm', nm)
              window.localStorage.setItem('nowId', id)
              // window.location.reload()
            }
          })
        }
      })
    }, 3000)
  }
}
</script>

<style lang="scss" scoped>
  .movie_menu {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 10;

    .city_name {
      margin-left: 20px;
      height: 100%;
      line-height: 45px;
    }
    .city_name.active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
    .city_name.router-link-active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }

    .hot_switch {
      display: flex;
      height: 100%;
      line-height: 45px;
    }
    .hot_item {
      font-size: 15px;
      color: #666;
      width: 80px;
      text-align: center;
      margin: 0 12px;
      font-weight: 700;
    }
    .hot_item.active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
    .hot_item.router-link-active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }

    .search_entry {
      margin-right: 20px;
      height: 100%;
      line-height: 45px;
      i {
        font-size: 24px;
        color: red;
      }
    }
    .search_entry.active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
    .search_entry.router-link-active {
      color: #ef4238;
      border-bottom: 2px #ef4238 solid;
    }
  }
</style>
