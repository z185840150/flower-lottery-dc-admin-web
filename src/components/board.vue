<style lang="scss">
@import "./../assets/sass/style.scss";
</style>
<template lang="pug">
  div.g-board
</template>
<script>
export default {
  name: 'board',
  props: {
    shadow: { type: Number, default: 0 },
    border: { type: Boolean, default: true },
    groups: { type: Array, default: [] }
  },
}
</script>
