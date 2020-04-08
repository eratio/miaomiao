<template>
  <div class="cinema_body">
    <loading v-if="isLoading" />
    <scroller v-else>
      <ul>
        <li v-for="item in cinemaList" :key="item.id">
          <div>
            <span>{{ item.nm }}</span>
            <span class="q" v-if="item.sellPrice">
              <span class="price">{{ item.sellPrice }}</span>元起
            </span>
          </div>
          <div class="address">
            <span>{{ item.addr }}</span>
            <span>{{ item.distance }}</span>
          </div>
          <div class="card">
            <template v-for="(num,key) in item.tag">
              <div v-if="num===1" :key="key" :class="key | classCard">{{ key | formatCard }}</div>
            </template>
          </div>
        </li>
      </ul>
    </scroller>
  </div>
</template>

<script>
export default {
  name: 'cinema-list',
  data () {
    return {
      cinemaList: [],
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
    this.axios.get('/api/cinemaList?cityId=' + cityId).then((res) => {
      const msg = res.data.msg
      if (msg === 'ok') {
        this.cinemaList = res.data.data.cinemas
        this.isLoading = false
        this.prevCityId = cityId
      }
    })
  },
  filters: {
    formatCard (key) {
      const card = [
        { key: 'allowRefund', value: '改签' },
        { key: 'endorse', value: '退' },
        { key: 'sell', value: '折扣卡' },
        { key: 'snack', value: '小吃' }
      ]
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value
        }
      }
      return ''
    },
    classCard (key) {
      const card = [
        { key: 'allowRefund', value: 'bl' },
        { key: 'endorse', value: 'bl' },
        { key: 'sell', value: 'or' },
        { key: 'snack', value: 'or' }
      ]
      for (let i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value
        }
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .cinema_body{
    flex:1;
    overflow:auto;
    ul{
      padding:20px;
      li {
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 20px;
      }
    }
    div {
      margin-bottom: 10px;
    }

    .q {
      font-size: 11px;
      color: #f03d37;
    }

    .price {
      font-size: 18px;
    }

    .address {
      font-size: 13px;
      color: #666;

      span:nth-of-type(2){
        float:right;
      }
    }
    .card{
      display: flex;

      div {
        padding: 0 3px;
        height: 15px;
        line-height: 15px;
        border-radius: 2px;
        color: #f90;
        border: 1px solid #f90;
        font-size: 13px;
        margin-right: 5px;
      }

      div.or {
        color: #f90;
        border: 1px solid #f90;
      }

      div.bl {
        color: #589daf;
        border: 1px solid #589daf;
      }
    }
  }
</style>
