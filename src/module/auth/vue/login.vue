<style lang="scss">
</style>
<template lang="pug">
  div#auth-login
    GlTextBox(label="请输入账号", v-model="username", :error="usernameError", :labelFloat="true", :canParse="false")
    GlTextBox(label="请输入密码", v-model="password", :error="passwordError", :labelFloat="true", type="password", :canParse="false")
    div.v-code
      GlTextBox(label="请输入验证码", v-model="validcode", :error="validcodeError", :labelFloat="true", :canParse="false")
      img(src="http://127.0.0.1:8089/api/admin/token?limit=10&page=1", width="50px", title="点击刷新验证码")

    GlButton(label="登录", :fullWidth="true" mode="flat")
</template>

<script>
import GlButton from './../../../components/glacier/GlButton'
import GlLink from './../../../components/glacier/GlLink'
import GlTextBox from './../../../components/glacier/GlTextBox'

export default {
  components: { GlButton, GlLink, GlTextBox },
  name: 'auth-login',
  data () {
    return {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      validcode: '',
      validcodeError: ''
    }
  },
}
</script>