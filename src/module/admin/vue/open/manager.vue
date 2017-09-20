<template lang="pug">
  div#page-overview-open(style="padding-right: 20px", ref="page")
    h2 授权管理
    br
    Tabs(value="name1" size="small")
      TabPane(label="管理" name="name1")
        Card(:dis-hover="true", :padding="20")
          Form(ref="formValidate", :model="formValidate", :rules="ruleValidate", :label-width="80")
            Row
              Col(span="11")
                FormItem(label="Open ID", prop="name")
                  Input(v-model="searchOpenId", placeholder="输入要查询的 OpenID")
              Col(span="2")
              Col(span="11")
                FormItem(label="名称", prop="name")
                  Input(v-model="searchCompanyName", placeholder="输入要查询的 名称")
        br
        Table(
          :columns="columns1"
          :data="data1"
          :border="true"
          :stripe="true")     
        br
        Page(:total="100", :page-size="50") 
      TabPane(label="详细" name="name3")
        Card(:dis-hover="true", :padding="20")
          p(slot="title") 访问时段分布(PV)
          Checkbox(slot="extra", v-model="chartsPVShadow") 开启阴影
</template>
<script>
export default {
  name: 'open auth manager',
  data () {
    return {
      columns1: [{
        title: 'OpenID',
        key: 'openid',
        fixed: 'left',
        sortable: true,
        ellipsis: true,
        width: 120
      }, {
        title: '名称',
        key: 'name',
        ellipsis: true,
        width: 140
      }, {
        title: '状态',
        key: 'state',
        ellipsis: true,
        width: 100,
        render: (h, params) => h('i-switch', {
          props: {
            value: params.row.state === 'active'
          }
        }, [
          h('span', { props: { slot: 'open' } }, '开'),
          h('span', { props: { slot: 'close' } }, '关')
        ])
      }, {
        title: '创建时间',
        key: 'createTime',
        width: 220
      }, {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 200,
        render: (h, params) => h('div', [
          h('Button', { props: { type: 'text', size: 'small' } }, '编辑'),
          h('Button', { props: { type: 'text', size: 'small' } }, '冻结'),
          h('Button', { props: { type: 'text', size: 'small' } }, '删除')
        ])
      }],
      data1: [{
        openid: 1001,
        name: '测试名称',
        state: 'active',
        createTime: '2017-09-13 11:46:29'
      }, {
        openid: 1002,
        name: '测试名称',
        state: 'freeze',
        createTime: '2017-09-13 11:46:29'
      }, {
        openid: 1003,
        name: '测试名称',
        state: 'freeze',
        createTime: '2017-09-13 11:46:29'
      }, {
        openid: 1004,
        name: '测试名称',
        state: 'freeze',
        createTime: '2017-09-13 11:46:29'
      }, {
        openid: 1005,
        name: '测试名称',
        state: 'freeze',
        createTime: '2017-09-13 11:46:29'
      }, {
        openid: 1006,
        name: '测试名称',
        state: 'freeze',
        createTime: '2017-09-13 11:46:29'
      }, {
        openid: 1007,
        name: '测试名称',
        state: 'freeze',
        createTime: '2017-09-13 11:46:29'
      }]
    }
  },
  watch: {
  },
  mounted () {
    this.$store.state.base.breadcrumbPath = ['开放授权', '授权管理']
  },
  methods: {
  }
}
</script>
