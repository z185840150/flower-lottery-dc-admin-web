<template lang="pug">
  div.gl-textbox(
      :class="{'label-float': labelFloat, 'label-static': labelStatic && !labelFloat, 'on-focus': isFocused, 'no-empty': inputValue !== '', 'has-error': error !== ''}")
    div.gl-textbox-label-space(ref="label", v-if="labelFloat") {{label}}
    div.gl-textbox-label(ref="label", :style="labelStatic && !labelFloat ? { height: height - 4 + 'px', 'line-height': height - 4 + 'px', width: staticWidth + 'px', 'text-align': staticAlign } : {}") {{label}}
    input.gl-textbox-input(
      ref="input",
      :type="type === 'password' ? showPasswordText ? 'text' : type : type",
      spellcheck="false",
      :maxlength="maxLength",
      :value="inputValue",
      :disabled="disabled",
      @change="handleChange",
      @focus="handleFocus",
      @input="handleInput",
      @blur="handleBlur",
      ondragstart="return false",
      ondragenter="return false",
      :onpaste="'return ' + canParse ? 'true' : 'false'",
      :style="[{ height: height + 'px', 'font-size': fontSize }, labelStatic && !labelFloat ? { 'padding-left': staticWidth + 12 + 'px' } : {}]")
    div.gl-textbox-line(v-if="labelFloat")
    div.gl-textbox-error(v-if="error !== ''") {{error}}
    div.gl-textbox-btns
      div.gl-textbox-btn(v-if="clearBtn && inputValue !== ''", @click="handleClearClick", :style="{ height: height - 4 + 'px', width: height - 4 + 'px', 'line-height': height - 4 + 'px' }")
        i.gl-icon.gl-icon-delete
      div.gl-textbox-btn(v-if="type === 'password' && inputValue !== ''", @click="handleShowPasswordClick" :style="{ height: height - 4 + 'px', width: height - 4 + 'px', 'line-height': height - 4 + 'px' }")
        i.gl-icon(:class="showPasswordText ? 'gl-icon-attention-fill gl-icon-active' : 'gl-icon-attention'")
      
</template>
<script>
import 'Font-Awesome/css/font-awesome.min.css'
export default {
  name: 'GlTextBox',
  componentName: 'GlTextBox',
  data () {
    return {
      showPasswordText: false,
      isFocused: false,
      inputValue: this.value
    };
  },
  watch: {
    value (val) {
      this.inputValue = val
    },
    inputValue (val, oldVal) {
      this.$emit('input', val)
    },
  },
  props: {
    value: {},
    disabled: { type: Boolean, default: false },
    label: { type: String, default: '' },
    labelFloat: { type: Boolean, default: false },
    labelStatic: { type: Boolean, default: false },
    staticWidth: { type: Number, default: 80 },
    staticAlign: { type: String, default: 'right' },
    error: { type: String, default: '' },
    height: { type: Number, default: 30 },
    fontSize: { type: String, default: '14px' },
    maxLength: { type: Number, default: -1 },
    type: { type: String, default: 'text' },
    canParse: { type: Boolean, default: true },
    clearBtn: { type: Boolean, default: true },
    onFocusSelected: { type: Boolean, default: true }
  },
  methods: {
    handleFocus (event) {
      this.isFocused = true
      this.$emit('focus', event)
      if (this.onFocusSelected) {
        this.$refs.input.select()
      }
    },
    handleBlur (event) {
      this.isFocused = false
      this.$emit('blur', event)
    },
    handleInput (event) {
      this.inputValue = event.target ? event.target.value : event
    },
    handleChange (event) {
      this.$emit('change', event, event.target.value)
    },
    handleClearClick (e) {
      this.inputValue = ''
    },
    handleShowPasswordClick (e) {
      if (this.type === 'password') {
        this.showPasswordText = !this.showPasswordText
      }
    }
  }
}
</script>
