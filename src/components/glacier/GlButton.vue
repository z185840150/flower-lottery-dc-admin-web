<template lang="pug">
  button.gl-button(:class="[{'full-width': fullWidth}, '']")
    div.gl-button-label {{label}}
</template>
<script>
export default {
  name: 'GlButton',
  componentName: 'GlButton',
  data () {
    return {
    };
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

  }
}
</script>
