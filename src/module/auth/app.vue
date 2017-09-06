<style lang="scss">

@import "./../../assets/sass/style.scss";
@import "./assets/base.scss";
</style>
<template lang="pug">
  div#app.glacier
    div.gl-wallpaper(ref="wallpaper") !{`<img ref="wallpaperImage" />`}
    div#login.gl-board.gl-effect.shadow-5(ref="panel")
      div.logo
        img(src="./assets/imgs/logo-big.png")
      div.gl-title.larger.white
        h1.csscdce7ba631a38c.title- 竞彩平台
        h5.title- 登录页面
      div.gl-blur !{`<div class="gl-blur-mask" /><canvas class="gl-blur-canvas" ref="panelBlurCanvas"/>`}
      GlTextBox(label="请输入账号", v-model="username", :labelFloat="true", :canParse="false")
      GlTextBox(label="请输入密码", v-model="password", :labelFloat="true", type="password")

      GlButton(label="登录", :fullWidth="true" mode="flat")
      GlButton(label="密码", :fullWidth="true")
      router-view
</template>
<script>
import GlButton from './../../components/glacier/GlButton'
import GlTextBox from './../../components/glacier/GlTextBox'

import { windowSize } from './../../util'
export default {
  components: { GlButton, GlTextBox },
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
      wallpaperSize: { width: 0, height: 0 },
      username: '',
      password: ''
    }
  },
  methods: {
    handleWindowOnResize() { 
      this.$store.state.base.window.size = windowSize() 
    },
    setWallpaper () {
      this.$refs.wallpaperImage.crossOrigin = 'Anonymous'
      this.$refs.wallpaperImage.src = require('./assets/imgs/texture_abstraction_paint_surface_116962_3840x2400.jpg')
      this.$refs.wallpaperImage.onload = () => {
        this.wallpaperSize = {
          width: this.$refs.wallpaperImage.naturalWidth,
          height: this.$refs.wallpaperImage.naturalHeight
        }
        require('stackblur-canvas').image(this.$refs.wallpaperImage, this.$refs.panelBlurCanvas, 180)
        this.coverWallpaper()
      }
    },
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