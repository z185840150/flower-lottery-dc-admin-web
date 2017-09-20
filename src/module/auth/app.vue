<style lang="scss">

@import "./../../assets/sass/style.scss";
@import "./assets/base.scss";
</style>
<template lang="pug">
  div#app.glacier
    div.gl-wallpaper(ref="wallpaper") !{`<img ref="wallpaperImage" />`}
    div#auth.gl-board.gl-effect.shadow-5(ref="panel")
      div.gl-blur !{`<div class="gl-blur-mask" /><canvas class="gl-blur-canvas" ref="panelBlurCanvas"/>`}
      div#auth-logo
        div.logo !{`<img src="./assets/imgs/logo-big.png" />`}
        div.gl-title.larger.white
          h1.title- 竞彩数据中心管理平台
          h5.title- Sport Lottory Data Center Manager
      router-view#auth-body
      div#auth-fotter
        GlLink(label="法律声明", link="#")
        GlLink(label="免责声明", link="#")
        GlLink(label="网站地图", link="#")
        GlLink(label="联系客服", link="#")
        GlLink(label="最新动态", link="#")
        GlLink(label="加入团队", link="#")
        GlLink(label="关于我们", link="#")
        br
        GlLink(label="Copy Right 2017-2018 Flower® China", link="#")
        br
        GlLink(label="沪ICP备14046347号-1", link="#")
</template>
<script>
import GlButton from './../../components/glacier/GlButton'
import GlLink from './../../components/glacier/GlLink'
import GlTextBox from './../../components/glacier/GlTextBox'

import { windowSize } from './../../util'
export default {
  components: { GlButton, GlLink, GlTextBox },
  mounted () {
    window.onresize = window.onload = this.handleWindowOnResize
    this.setWallpaper()
  },
  watch: { 
    '$store.state.base.window.size': 'coverWallpaper',
    '$store.state.base.needCover': 'coverWallpaper',
  },
  data () {
    return {
      wallpaperSize: { 
        width: 0,
        height: 0
      }
    }
  },
  methods: {
    /** Window onResize 事件绑定 */
    handleWindowOnResize() { 
      this.$store.state.base.window.size = windowSize() 
    },
    /** 设置壁纸 */
    setWallpaper () {
      this.$refs.wallpaperImage.crossOrigin = 'Anonymous'
      this.$refs.wallpaperImage.src = require('./assets/imgs/mountains_peaks_snow_116990_4745x3163.jpg')
      this.$refs.wallpaperImage.onload = () => {
        this.wallpaperSize = {
          width: this.$refs.wallpaperImage.naturalWidth,
          height: this.$refs.wallpaperImage.naturalHeight
        }
        require('stackblur-canvas').image(this.$refs.wallpaperImage, this.$refs.panelBlurCanvas, 180)
        this.coverWallpaper()
      }
    },
    /** 壁纸范围尺寸调整 */
    coverWallpaper () {
      this.$refs.panel.style.width = `${this.$store.state.base.panel.width}px`
      if (this.wallpaperSize.width <= 0 || this.wallpaperSize.height <= 0) return

      const winSize = this.$store.state.base.window.size

      let coverPosition = {}

      coverPosition.width = winSize.width
      coverPosition.height = this.wallpaperSize.height * (winSize.width / this.wallpaperSize.width)

      coverPosition = (coverPosition.height < winSize.height) ? {
        width: this.wallpaperSize.width * (winSize.height / this.wallpaperSize.height),
        height: winSize.height
      } : coverPosition

      coverPosition = (coverPosition.width < winSize.width) ? {
        height: winSize.width,
        width: this.wallpaperSize.height * (winSize.width / this.wallpaperSize.width)
      } : coverPosition

      coverPosition.left = 0 - (coverPosition.width - winSize.width) / 2
      coverPosition.top = 0 - (coverPosition.height - winSize.height) / 2

      this.$refs.wallpaper.style.width = winSize.width + 'px'
      this.$refs.wallpaper.style.height = winSize.height + 'px'

      this.$refs.wallpaperImage.width = coverPosition.width
      this.$refs.wallpaperImage.height = coverPosition.height
      this.$refs.wallpaperImage.style.marginLeft = coverPosition.left + 'px'
      this.$refs.wallpaperImage.style.marginTop = coverPosition.top + 'px'
      this.$refs.wallpaperImage.style.opacity = '1'

      this.$refs.panelBlurCanvas.style.width = coverPosition.width + 'px'
      this.$refs.panelBlurCanvas.style.height = coverPosition.height + 'px'
      this.$refs.panelBlurCanvas.style.marginLeft = ((0 - (winSize.width - this.$refs.panel.offsetWidth) / 2) + coverPosition.left) + 'px'
      this.$refs.panelBlurCanvas.style.marginTop = ((0 - (winSize.height - this.$refs.panel.offsetHeight) / 2) + coverPosition.top) + 'px'
    }
  }
}
</script>
