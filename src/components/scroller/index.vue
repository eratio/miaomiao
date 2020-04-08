<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import MyScroler from 'better-scroll'

export default {
  name: 'scroller',
  props: {
    handleToScroll: {
      type: Function,
      default: function () {}
    },
    handleToTouchEnd: {
      type: Function,
      default: function () {}
    }
  },
  mounted () {
    const scroll = new MyScroler(this.$refs.wrapper, {
      tap: true,
      probeType: 1
    })

    this.scroll = scroll

    scroll.on('scroll', (pos) => {
      this.handleToScroll(pos)
    })

    scroll.on('touchEnd', (pos) => {
      this.handleToTouchEnd(pos)
    })
  },
  methods: {
    toScrollTop (y) {
      this.scroll.scrollTo(0, y)
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrapper{
    height:100%
  }
</style>
