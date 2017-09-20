<template lang="pug">
  button.gl-button(
    :class="[{'full-width': fullWidth, 'waves-effect': ripple, 'has-ripples': rippleDOMs.length > 0}, '']", 
    :mode="mode",
    ref="button",
    @focus="handleFocus",
    @blur="handleBlur",
    @mousedown="handleMouseDown",
    @mouseup="handleMouseOut",
    @mouseout="handleMouseOut")
    div.gl-button-label {{label}}
    div.waves-ripple-focus(ref="focus", style="display: none")
</template>
<script>
export default {
  name: 'GlButton',
  componentName: 'GlButton',
  data () {
    return {
      rippleDOMs: []
    };
  },
  mounted () {
    this.$refs.focus.onresize = this.resizeFocus
  },
  props: {
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
    tabIndex: { type: Number, default: 0 },
    fullWidth: { type: Boolean, default: false },
    mode: { type: String, default: 'flat', enum: ['flat', 'raised', 'floating'] },
    ripple: { type: Boolean, default: true },
    rippleColor: { type: String, default: 'rgba(0, 0, 0, 0.2)' }
  },
  methods: {
    handleMouseUp (event) {},
    handleMouseDown (event) {
      if (event.button !== 0) return
      
      let parent = event.currentTarget
      let target = event.srcElement || event.target

      let position = {
        x: event.layerX + (parent === target ? 0 : target.offsetLeft),
        y: event.layerY + (parent === target ? 0 : target.offsetTop)
      }

      let maxSize = Math.max(parent.offsetWidth, parent.offsetHeight) * 1.25

      let rippleDom =  document.createElement('span')

      rippleDom.style.left = position.x - maxSize / 2 + 'px'
      rippleDom.style.top = position.y - maxSize / 2 + 'px'
      rippleDom.style.width = maxSize + 'px'
      rippleDom.style.height = maxSize + 'px'
      
      parent.appendChild(rippleDom)

      rippleDom.className = 'waves-ripple'

      this.rippleDOMs.push(rippleDom)

      setTimeout(() => { this.$refs.focus.style.display = 'none' }, 0);
    },
    handleMouseOut (event) {
      if (event.button !== 0) return 
      this.rippleDOMs.map((item, index) => {
        if (item.className !== 'waves-ripple fade-out') {
          item.className = 'waves-ripple fade-out'
          setTimeout(() => {
            this.$refs.button.removeChild(item)
            this.rippleDOMs.splice(this.rippleDOMs.indexOf(item), 1)
          }, 500)
        }
      })
    },
    handleFocus (event) {

      this.resizeFocus()
    },
    handleBlur (event) {
      this.$refs.focus.style.display = 'none'
    },
    resizeFocus (event) {
      let parent = this.$refs.button

      let maxSize = Math.max(parent.offsetWidth, parent.offsetHeight) * 1.25

      this.$refs.focus.style.display = 'block'
      this.$refs.focus.style.width = maxSize + 'px'
      this.$refs.focus.style.height = maxSize + 'px'
      this.$refs.focus.style.left = parent.offsetWidth / 2 - maxSize / 2 + 'px'
      this.$refs.focus.style.top = parent.offsetHeight / 2 - maxSize / 2 + 'px'
    },
    resize () {
      console.log(11111)
    }
  }
}
</script>
