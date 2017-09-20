<template lang="pug">
  div.fb-detail
    div.fb-detail-sort
      el-dropdown
        span.el-dropdown-link
          | 筛选（共:0场，隐藏：0场）
          i.el-icon-caret-bottom.el-icon--right
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item 黄金糕
          div
           p 赛期筛选
           el-checkbox(v-model="sort.yesterday") 昨天
           el-checkbox(v-model="sort.today") 今天
           el-checkbox(v-model="sort.tomorrow") 明天
           p 赛事筛选
           el-checkbox(v-model="sort.match.a") 欧洲冠军联赛
           el-checkbox(v-model="sort.match.b") 英格兰冠军联赛
           el-checkbox(v-model="sort.match.c") 智利杯
           el-checkbox(v-model="sort.match.d") 南美解放者杯
           br
           el-checkbox(v-model="sort.match.e") 南美俱乐部杯
           el-checkbox(v-model="sort.match.f") 美国职业大联盟
           el-checkbox(v-model="sort.match.g") 墨西哥杯
           el-checkbox(v-model="sort.match.h") 欧罗巴联赛
      el-checkbox(v-model="sort.had") 胜平负
      el-checkbox(v-model="sort.hhad") 让球胜平负
      el-checkbox(v-model="sort.showChanged") 奖金区浮动显示奖金变化
      span(style="float:right")
        a.sort-link 【使用说明】
        span.sort-label 刷新时间：{{tableDataRefreshTime}}
        i.sort-bar-btn.fa.fa-refresh(@click="getTableData")
    div.fb-detail-data
      el-table(
        :data="tableDate"
        :border="true"
        style="width: 100%"
        v-loading="tableDataIsLoading"
        element-loading-text="数据加载中...")
        el-table-column(type="expand")
          template(scope="props")
            div
              p 123
        el-table-column(prop="matchNumber", label="赛事编号", width="100")
        el-table-column(label="赛事", width="100")
          template(scope="data")
            el-tag(:color="`#${data.row.matchLeagueColor}`") {{data.row.matchLeagueNameAbbr}}
        el-table-column(label="主队 VS 客队", width="320")
          template(scope="data")
            el-tooltip(content="点击查看赛事详情", placement="left")
              div.teams-name
                span.team-mark.mark-h {{data.row.teamsHomeOrder}}
                a.team-names-link
                  span.team-name.name-h {{data.row.teamsHomeName}}
                  span.team-vs VS
                  span.team-name.name-a {{data.row.teamsGuestName}}
                span.team-mark.mark-a {{data.row.teamsGuestOrder}}
        el-table-column(label="开赛时间", width="150")
          template(scope="data")
            div {{data.row.matchDateTimeDate}} {{data.row.matchDateTimeTime}}
        el-table-column(label="天气", width="90")
          template(scope="data")
            el-tooltip(:content="data.row.matchWeather", placement="left")
              div
                i.weather-icon.wi(:class="data.row.matchWeatherIconClass")
                span {{data.row.matchTemperatureDisplay}}
        el-table-column(fixed="right", label="让球", width="110")
          template(scope="data")
            el-select(v-model="data.row.concedeSelected", placeholder="请选择", size="small")
              el-option(v-for="item in tableConcedeSelecter", :key="item.value", :label="item.label", :value="item.value")
        el-table-column(fixed="right", label="胜平负", width="110")
        el-table-column(fixed="right", label="投注比例", width="110")
        el-table-column(fixed="right", label="重要提示", width="100")
        
    div.fb-detail-ctrl

    div.fb-detail-helper
      p.helper-title 竞彩足球投注提示：
      p.helper-clauses 1、让球只适合“让球胜平负”玩法，“+”为客让主，“-”为主让客。
      p.helper-clauses.warning 2、页面中过关投注固定奖金仅供参考，实际奖金以出票时刻奖金为准。投注区显示的中奖金额=每1元对应中奖奖金。
      p.helper-clauses 3、过关投注完场显示的奖金仅指比赛截止投注时的过关奖金，仅供参考，派奖奖金以方案详情中出票时刻的奖金为准。
      p.helper-clauses 4、2或3场过关投注，单注最高奖金限额10万元；4或5场过关投注，单注最高奖金限额50万元；6场和6场以上过关投注，单注最高奖金限额100万元。
      p.helper-clauses.warning 5、网站保留最终解释权。
</template>
<script>
import moment from 'moment'
import GlTableDiv from './../../../../../components/glacier/GlTableDiv.vue'
export default {
  components: { GlTableDiv },
  mounted () { this.getTableData() },
  data () {
    return {
      tableColumns: [
        {
          name: '赛事编号',
          fixed: 'left',
          width: 100
        }, {
          name: '赛事',
          textAlign: 'left',
          fixed: 'left',
          width: 100
        }, {
          name: '主队 VS 客队',
          width: 350
        }, {
          name: '开赛时间',
          fixed: 'left',
          width: 150
        }, {
          name: '天气',

          width: 90
        }, {
          name: '让球',
          fixed: 'right',
          width: 100
        }, {
          name: '胜平负',
          fixed: 'right',
          width: 110
        }, {
          name: '投注比例',
          fixed: 'right',
          width: 110
        }, {
          name: '重要提示',
          fixed: 'right',
          width: 100
        }],
      tableColumnWidth: [100, 100, 320, 150, 90, 110, 110, 110, 100],
      tableDataIsLoading: true,
      tableDataRefreshTime: '',
      tableDate: [],
      tableConcedeSelecter: [{
        value: 0,
        label: '0'
      }, {
        value: 1,
        label: '+1'
      }, {
        value: -1,
        label: '-1'
      }],
      weatherClasses: [
        'wi-na',
        'wi-day-sunny',
        'wi-cloud',
        'wi-cloudy',
        'wi-hail',
        'wi-showers',
        'wi-sleet',
        'wi-showers',
        'wi-sprinkle',
        'wi-rain',
        'wi-raindrop',
        'wi-fog',
        'wi-fog',
        'wi-fog'],
      weatherNames: [
        '未知',
        '天晴',
        '大致多云',
        '多云',
        '小阵雨',
        '附近有阵雨',
        '毛毛雨',
        '微雨',
        '小雨',
        '雨',
        'Heavy Rain',
        '薄雾',
        '雾',
        'Shallow Fog'],
      /*table: {
        weatherCN: ['未知', '天晴', '大致多云', '小阵雨', '雨'],
        weather: ['wi-na', 'wi-day-sunny', 'wi-cloud', 'wi-hail', 'wi-rain'],
        columns: [
          { title: '赛事编号', 
            width: 65, 
            align: 'center', 
            fixed: 'left', 
            render: (h, params) => h('span', params.row.match.num) },
          { title: '赛事', 
            width: 100, 
            align: 'center', 
            fixed: 'left',
            className: 'league-name',
            render: (h, params) => 
              h('div', { 
                class: 'league-name-text',
                style: {
                  background: '#' + params.row.match.league.color
                }}, params.row.match.league.nameAbbr) },
          { title: '开赛时间', 
            width: 70, 
            align: 'center', 
            render: (h, params) => 
              h('div', [
                h('p', moment(params.row.match.date).format('MM-DD')), 
                h('p', moment(params.row.match.date).format('HH:mm'))])},
          { title: '天气', 
            width: 70, 
            align: 'center', 
            render: (h, params) => 
              h('div', { class: 'match-weather' }, [
                h('i', { 
                  class: `wi ${
                    params.row.match.weather === '未知' || !params.row.match.weather 
                    ? this.data.weather[0] 
                    : this.data.weather[this.data.weatherCN.indexOf(params.row.match.weather)] }` }),
                h('p', `${(
                  parseInt(params.row.match.temperature) 
                    ? parseInt(params.row.match.temperature) + '℃' 
                    : '未知')}`)])},
          { title: '主队 VS 客队', 
            width: 400, 
            align: 'center', 
            render: (h, params) => 
              h('div', { class: 'teams-name' }, [
                h('span', { class: 'team-mark mark-a' }, params.row.teams.home.order),
                h('a', { class: 'team-names-link' }, [
                  h('span', { class: 'team-name name-a' }, params.row.teams.home.name),
                  h('span', { class: 'team-vs' }, 'VS'),
                  h('span', { class: 'team-name name-h' }, params.row.teams.guest.name)
                ]),
                h('span', { class: 'team-mark mark-h' }, params.row.teams.guest.order)])},
          { title: '让球', 
            width: 100, 
            align: 'center', 
            fixed: 'right', 
            render: (h, params) => h('div', { class: 'concede-ball' }, [
              h('Select', { 
                props: {
                  value: this.data.data[params.index].concedeSelected
                },
                on: {
                  input: event => {
                    //this.data.data[params.index].concedeSelected = event
                    //this.$emit('input', event)
                  }
                }
              }, [
                h('Option', { props: { value: '0' } }, '0'),
                h('Option', { props: { value: '1' } }, '+1'),
                h('Option', { props: { value: '-1' } }, '-1')
              ])
            ])},
          { title: '胜负平', 
            width: 300, 
            align: 'center', 
            fixed: 'right', 
            render: (h, params) => {
              h('div', {}, [

              ])}},
          { title: '投注比例', width: 300, align: 'center'},
          { title: '重要提示', width: 100, align: 'center'}
        ]
      },*/
      sort: {
        had: true,
        hhad: true,
        showChanged: false,
        yesterday: true,
        today: true,
        tomorrow: true,
        match: { a: true, b: true, c: true, d: true, e: true, f: true, g: true, h: true }
      }
    }
  },
  methods: {
    getTableData () {
      this.tableDataIsLoading = true
      this.tableDataRefreshTime = '正在获取...'
      this.tableDate = []

      fetch('http://192.168.3.4:8089/api/sport/fb/hhad_list', {
        method: 'get',
        mode: 'cors'
      })
      .then(res => res.json())
      .then(json => {
        let _data = []
        let keys = Object.keys(json.data)
        keys.map((item, index) => {
          let native = json.data[item]
          _data.push({
            matchId: native.id,
            matchNumber: native.num,
            matchStatus: native.status,
            matchWeather: native.weather,
            matchWeatherIconClass: native.weather === '未知' || !native.weather
              ? this.weatherClasses[0]
              : this.weatherClasses[this.weatherNames.indexOf(native.weather)],
            matchTemperature: native.temperature,
            matchTemperatureDisplay: parseInt(native.temperature) 
              ? parseInt(native.temperature) + '℃' 
              : '',
            matchCity: native.weather_city,
            matchDateTime: native.b_date + ' ' + native.time,
            matchDateTimeDate: moment(native.b_date + ' ' + native.time).format('MM-DD'),
            matchDateTimeTime: moment(native.b_date + ' ' + native.time).format('HH:mm'),
            matchLeagueId: native.l_id,
            matchLeagueName: native.l_cn,
            matchLeagueNameAbbr: native.l_cn_abbr,
            matchLeagueColor: native.l_background_color,
            teamsHomeId: native.h_id,
            teamsHomeName: native.h_cn_abbr,
            teamsHomeOrder: native.h_order,
            teamsGuestId: native.a_id,
            teamsGuestName: native.a_cn_abbr,
            teamsGuestOrder: native.a_order,
            had: native.had,
            hhad: native.hhad,
            concedeSelected: 0
          })
        })
        this.tableDate = _data
        this.tableDataRefreshTime = moment().format('YYYY年MM月DD日 HH:mm:ss')
        this.tableDataIsLoading = false;
      })
    }
  }
}
</script>
