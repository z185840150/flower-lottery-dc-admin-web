<template lang="pug">
  div.gl-table-div
    div.table-fixed.fixed-left
      div.table-column-list(
        v-for="")
        div.table-column-item
        div.table-date-item

    div.table-fixed
    div.table-fixed.fixed-right
    //div.gl-table-group.fixed.fixed-left
      div.gl-table-columns
        div.gl-table-column(
          v-for="(item, index) in columns"
          v-if="item.fixed === 'left'"
          :class="[{ 't-left': item.textAlign === 'left', 't-right': item.textAlign === 'right' }]"
          :style="{ width: `${item.width}px` }") {{item.name}}
          div.gl-table-data 1231232132112332132132132132132131
    //div.gl-table-group
      div.gl-table-columns
        div.gl-table-column.fixed-hidden(
          v-for="(item, index) in columns"
          v-if="item.fixed === 'left'"
          :style="{ width: `${item.width}px` }") {{item.name}}
        div.gl-table-column(
          v-for="(item, index) in columns"
          v-if="item.fixed !== 'left' && item.fixed !== 'right'"
          :style="{ width: `${item.width}px` }") {{item.name}}
        div.gl-table-column.fixed-hidden(
          v-for="(item, index) in columns"
          v-if="item.fixed === 'right'"
        :style="{ width: `${item.width}px` }") {{item.name}}
    //div.gl-table-group.fixed.fixed-right
      div.gl-table-columns
        div.gl-table-column(
          v-for="(item, index) in columns"
          v-if="item.fixed === 'right'"
          :class="[{ 't-left': item.textAlign === 'left', 't-right': item.textAlign === 'right' }]"
          :style="{ width: `${item.width}px` }") {{item.name}}
</template>
<script>
export default {
  name: 'GlTableDiv',
  componentName: 'GlTableDiv',
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  props: {
    columns: { type: Array, default: [] },
  },
  methods: {
  }
}
</script>
