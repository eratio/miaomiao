<template>
  <div class="movie_body" ref="movie_body">
    <loading v-if="isLoading" />
    <scroller v-else>
      <ul>
        <li v-for="item in comingList" :key="item.id">
          <div class="pic_show" @tap="handleToDetail(item.id)"><img :src="item.img | setWH('128.180')"></div>
          <div class="info_list">
            <h2 @tap="handleToDetail(item.id)">{{ item.nm }} <img v-if="item.version" src="@/assets/maxs.png" alt=""></h2>
            <p><span class="person">{{ item.wish }}</span> 人想看</p>
            <p>主演: {{ item.star }}</p>
            <p>{{ item.rt }}上映</p>
          </div>
          <div class="btn_pre">
            预售
          </div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'coming-soon',
  data () {
    return {
      comingList: [],
      isLoading: true,
      prevCityId: -1
    }
  },
  activated () {
    const cityId = this.$store.state.city.id
    if (this.prevCityId === cityId) {
      return
    }
    this.isLoading = true
    this.axios.get('/api/movieComingList?cityId=' + cityId).then((res) => {
      const msg = res.data.msg
      if (msg === 'ok') {
        this.comingList = res.data.data.comingList
        this.isLoading = false
        this.prevCityId = cityId
      }
    })
  },
  methods: {
    handleToDetail (movieId) {
      this.$router.push('/movie/detail/2/' + movieId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .movie_body {
    flex: 1;
    overflow: auto;
    ul{
      margin: 0 12px;
      overflow: hidden;

      li {
        margin-top: 12px;
        display: flex;
        align-items: center;
        border-bottom: 1px #e6e6e6 solid;
        padding-bottom: 10px;
      }
    }
    .pic_show {
      width: 64px;
      height: 90px;
      img {
        width: 100%;
      }
    }
    .info_list {
      margin-left: 10px;
      flex: 1;
      position: relative;

      h2 {
        font-size: 17px;
        line-height: 24px;
        width: 150px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      p {
        font-size: 13px;
        color: #666;
        line-height: 22px;
        width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .grade {
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
      }

      img {
        width: 50px;
        position: absolute;
        right: 10px;
        top: 5px;
      }
    }
    .btn_mall, .btn_pre{
      width: 47px;
      height: 27px;
      line-height: 28px;
      text-align: center;
      background-color: #f03d37;
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
    }
    .btn_pre {
      background-color: #3c9fe6;
    }
    .pullDown {
      margin: 0;
      padding: 0;
      border: none;
    }
  }

</style>
