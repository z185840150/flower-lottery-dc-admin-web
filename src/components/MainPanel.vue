<style lang="scss">
  .main-panel {
    background: black;
    width: 100%;
    height: 100%;
    .swiper-wrapper {
      padding: 20px;
      .p-name2 {
        font-size: 18px;
      }
    }
    .panel-item {
      border-radius: 25px;
      width: 150px;
      background: red;
      margin: 0 15px;
    }
  }
</style>
<template lang="pug">
  div.main-panel.swiper-container
    div.swiper-wrapper(ref="swipper")
      div.swiper-slide.panel-item(
        v-for="(item, index) in data"
        @click="click(index)"
        :style="{height:`${(item.height || 150) + 'px'}`, margin:`${(item.margin || 25) + 'px'}`}"
      )
        span {{item.name}}
        p.p-name2 {{item.name2}}
</template>


<script>
import swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'Main Panel',
  data () {
    return {
      swiper: null
    }
  },
  mounted () {
    this.swiper = swiper('.swiper-container', {
      // scrollbar: '.swiper-scrollbar',
      // mousewheelControl: true,
      slidesPerView :'auto',
      freeMode: true,
      slidesPerColumnFill : 'row',
    })
  },
  props: {
    data: { type: Array, default: [] },
    click: { type: Function, default: (index) => {} }
  },
}
</script>
