<template lang="pug">
  div.gl-link
    a(:style="{fontSize}", :href="link", :title="title") {{label}}
</template>
<script>
export default {
  name: 'GlLink',
  componentName: 'GlLink',
  data () {
    return {
    }
  },
  props: {
    /** 文本 */
    label: { type: String, default: '' },
    /** 字体大小 */
    fontSize: { type: String, default: '12px' },
    /** 链接 */
    link: { type: String, default: '#' },
    title: { type: String, default: '' }
  }
}
</script>

