<style lang="scss">
@import "./../../assets/sass/style.scss";
@import "./assets/base.scss";
</style>
<template lang="pug">
  div#app.glacier
    // 头部菜单栏
    div#admin-top-header
      div.gl-blur
        div.gl-blur-mask
        canvas.gl-blur-canvas
      div.header-grp.logo
        div.header-item.logo(:class="[{'opened': header.opened}]")
          img(src="./../../assets/img/logo.png")
          p(v-if="header.opened") LDC Manager
      div.header-grp
        // 展开收回侧面板
        div.header-item.icon.side-menu-swich
          i.item-icon.fa.fa-navicon
        // 刷新
        div.header-item.icon.refresh
          i.item-icon.fa.fa-refresh
        // 用户面板
        div.header-item.icon.user-panel
          i.item-icon.fa.fa-user
      div.header-grp.right.no-border
        // 消息盒子
        div.header-item.icon.notice-box
          i.item-icon.fa.fa-envelope
        // 对话边栏
        div.header-item.icon.side-chart
          i.item-icon.fa.fa-comments
        // 设置边栏
        div.header-item.icon.side-setting
          i.item-icon.fa.fa-cog
      div.header-grp.right
        // 语言
        div.header-item.icon.language
          i.item-icon.fa.fa-globe
        // 帮助
        div.header-item.icon.help
          i.item-icon.fa.fa-question-circle
    // 左侧菜单栏
    div#admin-side-nav.swiper-container(ref="side-nav-swiper")
      div.swiper-wrapper(ref="swipper")
        div.swiper-slide(style="height:auto")
          Menu#admin-side-nav-menu(
            :accordion="true"
            @on-select="gotoPage"
            theme="dark"
            :active-name="activeName"
            :open-names="['1']"
            width="auto")
            Submenu(name="1")
              template(slot="title") !{`<Icon type="podium" />数据概览`}
              MenuItem(name="/overview/open") 开放授权
              MenuItem(name="/overview/trend") 用户趋势
            Submenu(name="2")
              template(slot="title") !{`<Icon type="network" />开放授权`}
              MenuItem(name="/open/manager") 授权管理
              MenuItem(name="/open/new") 新增企业用户
            Submenu(name="3")
              template(slot="title") !{`<Icon type="levels" />服务器设置`}
              MenuItem(name="/server/web") 网站设置
              MenuItem(name="/server/web-state") 状态变更
              MenuItem(name="/server/logs-manager") 日志管理
              MenuItem(name="/server/db-manager") 数据管理
              MenuItem(name="/server/crawler") 爬虫管理
            Submenu(name="4")
              template(slot="title") !{`<Icon type="pie-graph" />行为分析`}
              MenuItem(name="/analyze/api") 接口调用分析
            Submenu(name="5")
              template(slot="title") !{`<Icon type="person-stalker" />管理人员`}
              MenuItem(name="/admin-manager/new") 新增管理员
              MenuItem(name="/admin-manager/edit") 修改管理员
            Submenu(name="6")
              template(slot="title") !{`<Icon type="compose" />账户信息`}
              MenuItem(name="/admin-account/reset-password") 修改密码
              MenuItem(name="/admin-account/edit") 修改资料
      div#admin-side-nav-menu-scrollbar.swiper-scrollbar
    // 工作区
    div#admin-workspace(ref="workspace")
      Breadcrumb#breadcrumb(ref="workspace-breadcrumb")
        BreadcrumbItem(v-for="item in $store.state.base.breadcrumbPath") {{item}}
      div#workspace-swiper(ref="workspace-swiper")
        div.swiper-wrapper(ref="workspace-wrapper")
          div.swiper-slide(ref="workspace-slide", style="height:auto", :onresize="function () { console.log(123) }")
            router-view(ref="routerPage")
        div#workspace-swiper-scrollbar.swiper-scrollbar
    // 右侧对话侧边栏
    div#admin-side-chart
</template>
<script>
import 'Font-Awesome/css/font-awesome.min.css'

import AdminSideBar from './components/AdminSideBar'
import GlTextBox from './../../components/glacier/GlTextBox'

import { windowSize } from './../../util'

export default {
  components: { AdminSideBar, GlTextBox },
  mounted () {
    window.onresize = window.onload = this.handleWindowOnResize
    this.swiper = new Swiper('#admin-side-nav', {
      scrollbar: '#admin-side-nav-menu-scrollbar',
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true
    })
    this.swiperWorkspace = new Swiper('#workspace-swiper', {
      scrollbar: '#workspace-swiper-scrollbar',
      direction: 'vertical',
      slidesPerView: 'auto',
      mousewheelControl: true,
      freeMode: true
    })
    document.getElementById('admin-side-nav-menu').addEventListener('click', () => {
      this.sideNavSwiperResize()
    })
    this.sideNavSwiperResize()
    $(this.$refs['workspace-slide']).resize(this.workspaceResize)
  },
  watch: {
  },
  data () {
    return {
      header: {
        opened: true
      },
      swiper: null,
      swiperWorkspace: null,
      activeName: '/overview/open'
    }
  },
  methods: {
    gotoPage (path) {
      this.activeName = path
      this.$router.push({ path })
    },
    handleWindowOnResize () {
      this.$store.state.base.window.size = windowSize()
      this.$refs['side-nav-swiper'].style.height = windowSize().height - 50 + 'px'
      this.$refs['workspace'].style.height = windowSize().height - 50 + 'px'
      this.$refs['workspace'].style.width = windowSize().width - this.$refs['side-nav-swiper'].offsetWidth + 'px'
      this.$refs['workspace-swiper'].style.height = this.$refs['workspace'].offsetHeight - document.getElementById('breadcrumb').offsetHeight + 'px'
    },
    sideNavSwiperResize () {
      setTimeout(() => {
        this.swiper.update()
      }, 0)
      setTimeout(() => {
        this.swiper.update()
      }, 300)
      setTimeout(() => {
        this.swiper.update()
      }, 600)
    },
    workspaceResize () {
      setTimeout(() => {
        this.swiperWorkspace.update()
      }, 0)
      setTimeout(() => {
        this.swiperWorkspace.update()
      }, 300)
      setTimeout(() => {
        this.swiperWorkspace.update()
      }, 600)
    }
  }
}
</script>
