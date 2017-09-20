<template lang="pug">
  div.side-nav-bar(:class="[opened ? 'opened' : 'closed']", ref="sidebar")
    div.bar-grp.grp-usr-panel(:class="[userPanelOpened ? 'opened' : 'closed']", ref="grp-usr-panel")
      div.usr-header
        img(src="./../../../assets/img/logo.png", alt="err", ref="avatat")
      p.usr-label.nickname Chameleon
        i.icon.fa.fa-edit
    div.bar-grp.swiper-container(
      ref="grp-swiper-list"
      :style="{ display: opened ? 'block' : 'none' }")
      div.swiper-wrapper(ref="swipper")
        div.swiper-slide(style="height:auto")
          div.list-group(
            v-for="(group, groupIndex) in groups"
            :key="group.title"
            :class="[group.opened ? 'opened' : 'closed']")
            div.list-title(@click="groupTitleClick(groupIndex)")
              div.title.waves-effect
                i.icon(:class="[group.icon]")
                | {{ group.title }}
              i.drop-icon.fa.fa-caret-down
            div.list-item(
              v-for="(item, index) in group.items",
              :key="item.title",
              :style="{ transition: group.opened ? `transform ${300 - index / group.items.length * 300}ms cubic-bezier(.26, .04, .34, 1.59) ${index / group.items.length * 300 + 300}ms, opacity ${300 - index / group.items.length * 300}ms cubic-bezier(.26,.04,.34,1.59) ${index / group.items.length * 300 + 300}ms, height 300ms cubic-bezier(.48,-0.01,.33,1.47) 0ms`: `transform ${300 - index / group.items.length * 300}ms cubic-bezier(.85,-0.76,.52,1) ${index / group.items.length * 300}ms,opacity ${300 - index / group.items.length * 300}ms cubic-bezier(.85, -0.76, .52,1) ${index / group.items.length * 300}ms,height 300ms cubic-bezier(.59,-0.75,.39,.89) 300ms`}")
              div.title.waves-effect
                i.icon(:class="[item.icon]")
                | {{ item.title }}
      div.swiper-scrollbar
</template>
<script>
export default {
  name: 'AdminSideBar',
  componentName: 'AdminSideBar',
  mounted () {
    this.swiper = swiper('.swiper-container', {
      scrollbar: '.swiper-scrollbar',
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true
    })
  },
  watch: {
    'opened': 'swiperResize',
    'userPanelOpened': 'swiperResize',
    'groups': 'swiperResize'
  },
  props: {
    opened: { type: Boolean, default: true },
    userPanelOpened: { type: Boolean, default: true },
    groups: { type: Array, default: [] }
  },
  data () {
    return {
      swiper: null
    }
  },
  methods: {
    swiperResize () {
      setTimeout(() => {
        let sideBarHeight = this.$refs['sidebar'].offsetHeight
        let userPanelHeight = this.$refs['grp-usr-panel'].offsetHeight
        let swiperList = this.$refs['grp-swiper-list']
        swiperList.style.height = `${(sideBarHeight - (this.opened ? userPanelHeight : 0))}px`
        this.swiper.update()
      }, 0)
    },
    groupTitleClick (index) {
      this.groups[index].opened = !(this.groups[index].opened)
      setTimeout(this.swiperResize, 0)
    }
  }
}
</script>

