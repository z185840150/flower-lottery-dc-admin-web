<style lang="scss">
@import "./../../assets/sass/style.scss";
@import "./assets/base.scss";
</style>
<template lang="pug">
  div#app.glacier
    div#app-header
      div.logo !{`<a><img src="./assets/img/header-logo.jpg" /></a>`}
      div.usr-panel
        el-form(:inline="true", :model="formInline")
          el-form-item(prop="user")
            el-input(type="text", v-model="formInline.user", placeholder="请输入用户名", style="width: 120px")
          el-form-item(prop="password")
            el-input(type="text", v-model="formInline.password", placeholder="请输入密码", style="width: 120px")
          el-form-item(prop="vcode")
            el-input(type="text", v-model="formInline.vcode", placeholder="输入验证码", style="width: 100px")
          el-form-item
            el-button(type="danger", @click="handleLoginSubmit('formInline')") 登录
          el-form-item
            el-button(type="text") 忘记密码
            el-button(type="text") 立即注册
    div#app-header-nav
      el-menu.nav-menu(mode="horizontal", default-active="home")
        el-menu-item(index="home") 首页
        el-menu-item(index="data") 联赛资料
        el-submenu(index="match")
          template(slot="title") 全部玩法
          el-menu-item-group
            span(slot="title") 竞彩足球
            el-menu-item(index="match-fb-hhad") 胜平负/让球胜平负
            el-menu-item(index="match-fb-score") 比分
            el-menu-item(index="match-fb-goals") 总进球
            el-menu-item(index="match-fb-half") 半全场
            el-menu-item(index="match-fb-mix") 混合过关
          el-menu-item-group
            span(slot="title") 传统足彩
            el-menu-item(index="3-7") 14场胜负/任选9场
            el-menu-item(index="3-8") 6场半全场
            el-menu-item(index="3-9") 4场球数
        el-menu-item(index="4") 竞彩足球
        el-menu-item(index="5") 传统足彩
        el-menu-item(index="6") 开奖结果
    div#app-workspace
      router-view
    div#app-footers
      div.panel.link-panel
        el-row
          el-col(:span="6")
            <p><a>如何注册账号？</a></p>
            <p><a>如何找回登录密码？</a></p>
            <p><a>如何修改密码？</a></p>
            <p><a>如何修改个人信息？</a></p>
          el-col(:span="6")
            <p><a>如何进行充值？</a></p>
            <p><a>如何购买彩票？</a></p>
            <p><a>如何查询彩票购买记录？</a></p>
            <p><a>充值未到账怎么办？</a></p>
          el-col(:span="6")
            <p><a>如何兑奖？</a></p>
            <p><a>如何进行提款？</a></p>
            <p><a>提款是否要求手续费？</a></p>
            <p><a>提款不成功怎么办？</a></p>
          el-col(:span="6")
            <p><a>QQ在线客服：123456</a></p>
            <p><a>QQ在线客服：234567</a></p>
            <p><a>QQ在线客服：345678</a></p>
            <p>在线咨询时间：7 x 24 小时</p>
      div.panel.footers-panel
        p.warning 郑重提示：彩票有风险，投注需谨慎！本站不向未满18周岁的青少年出售彩票！
        br
        
        <p>相关机构 <a>国家体育总局</a>|<a>中国体彩网</a></p>
        <p><a>法律声明</a>|<a>网站导航</a>|<a>联系我们</a>|<a>在线客服</a>|<a>免责说明</a></p>
        <p><a>竞彩网ICP编号：京ICP证090602号</a>|<a>京公网安备 11010702001614号</a></p>
        br
        p 本网站赛程、赛果、奖金等数据由国家体育总局体育彩票管理中心发布
        br
        p Power By 
          a.link Flower Network Technology Co Ltd 
          | CopyRight 2017-2020
</template>
<script>

export default {
  mounted () {
  },
  watch: {
  },
  data () {
    return {
      formInline: { user: '', password: '', vcode: '' },
      ruleInline: { 
        user: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [ 
          { required: true, message: '请填写密码', trigger: 'blur' }, 
          { type: 'string', min: 6, message: '密码长度不能小于6位', trigger: 'blur' }],
        vcode: [{ required: true, message: '请填写验证码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLoginSubmit (name) {
      this.$refs[name].validate((valid) => {
        //if (valid) this.$Message.success('提交成功!')
        //else this.$Message.error('表单验证失败!')
      })
    }
  }
}
</script>
