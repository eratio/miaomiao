<template>
  <div class="city_body">
    <div class="city_list">
        <div class="city_hot">
          <h2>热门城市</h2>
          <ul class="clearfix">
            <li v-for="item in hotCities" :key="item.id">
              {{ item.nm }}
            </li>
          </ul>
        </div>
        <div class="city_sort" ref="city_sort">
          <div v-for="item in cityList" :key="item.index">
            <h2>{{ item.index }}</h2>
            <ul>
              <li v-for="itemList in item.list" :key="itemList.id">{{ itemList.nm }}</li>
            </ul>
          </div>
        </div>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) in cityList" :key="item.index" @click="handleToIndex(index)">
          {{ item.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'city',
  data () {
    return {
      hotCities: [],
      cityList: []
    }
  },
  mounted () {
    this.axios.get('/api/cityList').then((res) => {
      const msg = res.data.msg
      if (msg === 'ok') {
        // [ { index: 'A', list:[ { nm: '阿尔泰', id: 123 }, ... ] }, ... ]
        const cities = res.data.data.cities
        const { hotCities, cityList } = this.formatCityList(cities)
        this.hotCities = hotCities
        this.cityList = cityList
      }
    })
  },
  methods: {
    formatCityList (cities) {
      const hotCities = []
      const cityList = []

      for (let i = 0; i < cities.length; i++) {
        if (cities[i].isHot === 1) {
          hotCities.push(cities[i])
        }
      }

      for (let i = 0; i < cities.length; i++) {
        const firstLetter = cities[i].py.substring(0, 1).toUpperCase()
        const index = containIndex(firstLetter)
        if (index >= 0) {
          cityList[index].list.push({ nm: cities[i].nm, id: cities[i].id })
        } else {
          cityList.push({ index: firstLetter, list: [{ nm: cities[i].nm, id: cities[i].id }] })
        }
      }

      // 根据首字母判断 cityList 是否已有
      function containIndex (letter) {
        for (let i = 0; i < cityList.length; i++) {
          if (cityList[i].index === letter) {
            return i
          }
        }
        return -1
      }

      // 数组排序
      cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1
        } else if (n1.index < n2.index) {
          return -1
        } else {
          return 0
        }
      })

      console.log(cityList)
      return {
        hotCities,
        cityList
      }
    },
    handleToIndex (index) {
      const h2 = this.$refs.city_sort.getElementsByTagName('h2')
      this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
    }
  }
}
</script>

<style lang="scss" scoped>
  .city_body {
    margin-top: 45px;
    display: flex;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;

    .city_list {
      flex: 1;
      overflow: auto;
      background: #FFF5F0;
    }
    .city_list::-webkit-scrollbar {
      background-color: transparent;
      width: 0;
    }
    .city_hot {
      margin-top: 20px;
      h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
      }
      ul{
        li{
          float: left;
          background: #fff;
          width: 29%;
          height: 33px;
          margin-top: 15px;
          margin-left: 3%;
          padding: 0 4px;
          border: 1px solid #e6e6e6;
          border-radius: 3px;
          line-height: 33px;
          text-align: center;
          box-sizing: border-box;
        }
      }
    }
    .city_sort{
      div {
        margin-top: 20px;
      }
      h2 {
        padding-left: 15px;
        line-height: 30px;
        font-size: 14px;
        background: #F0F0F0;
        font-weight: normal;
      }
      ul {
        padding-left: 10px;
        margin-top: 10px;
        li {
          line-height: 30px;
          line-height: 30px;
        }
      }
    }
    .city_index {
      width: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      border-left: 1px #e6e6e6 solid;
    }
  }
</style>
