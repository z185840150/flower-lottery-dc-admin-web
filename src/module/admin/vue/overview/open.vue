<template lang="pug">
  div#page-overview-open(style="padding-right: 20px", ref="page")
    h2 开放授权
    br
    Card(:dis-hover="true", :padding="20")
      p(slot="title") 访问时段分布(PV)
      Select(slot="extra", v-model="chartsPVMode", style="width: 100px; margin-right: 10px")
        Option(v-for="item in chartsPVModes", :value="item.value", :key="item.value") {{item.label}}
      Checkbox(slot="extra", v-model="chartsPVShadow") 开启阴影
      Checkbox(slot="extra", v-model="chartsPVColor") 纯色模式  
      canvas#chartsPV.swiper-no-swiping(style="width: 100%; height: 400px", ref="chartsPV")
</template>
<script>
import echarts from 'echarts'
import 'echarts-gl'
export default {
  name: 'overview-open',
  data () {
    return {
      chartsPV: null,
      chartsPVColor: false,
      chartsPVShadow: true,
      chartsPVMode: 'bar3D',
      chartsPVModes: [{
        value: 'bar3D', 
        label: '柱形图'
      }, {
        value: 'line3D', 
        label: '线形图'
      }]
    }
  },
  watch: {
    '$store.state.base.window.size': 'drawChartsPV',
    'chartsPVShadow': 'drawChartsPV',
    'chartsPVColor': 'drawChartsPV',
    'chartsPVMode': 'drawChartsPV'
  },
  mounted () {
    this.$store.state.base.breadcrumbPath = ['数据概览', '开放授权']
    this.initChartsPV()
  },
  methods: {
    initChartsPV () {
      if (this.chartsPV) this.chartsPV.dispose()
      this.chartsPV = echarts.init(this.$refs.chartsPV, null, {
        width: this.$refs.chartsPV.offsetWidth, 
        height: this.$refs.chartsPV.offsetHeight
      })
      this.drawChartsPV()
    },
    resizeChartsPV () {
      if (this.chartsPV) this.chartsPV.resize({
        width: this.$refs.chartsPV.offsetWidth, 
        height: this.$refs.chartsPV.offsetHeight
      })
    },
    drawChartsPV () {
      var hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
        '07:00', '08:00', '09:00','10:00','11:00',
        '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
        '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
      var days = ['2017-09-12', '2017-09-11', '2017-09-10'];
      var data = [
        [0,0,5],[0,1,1],[0,2,0],[0,3,0],[0,4,0],[0,5,0],[0,6,0],[0,7,0],[0,8,0],[0,9,0],[0,10,0],[0,11,2],[0,12,4],[0,13,1],[0,14,1],[0,15,3],[0,16,4],[0,17,6],[0,18,4],[0,19,4],[0,20,3],[0,21,3],[0,22,2],[0,23,5],
        [1,0,7],[1,1,0],[1,2,0],[1,3,0],[1,4,0],[1,5,0],[1,6,0],[1,7,0],[1,8,0],[1,9,0],[1,10,5],[1,11,2],[1,12,2],[1,13,6],[1,14,9],[1,15,11],[1,16,6],[1,17,7],[1,18,8],[1,19,12],[1,20,5],[1,21,5],[1,22,7],[1,23,2],
        [2,0,1],[2,1,1],[2,2,0],[2,3,0],[2,4,0],[2,5,0],[2,6,0],[2,7,0],[2,8,0],[2,9,0],[2,10,3],[2,11,2],[2,12,1],[2,13,9],[2,14,8],[2,15,10],[2,16,6],[2,17,5],[2,18,5],[2,19,5],[2,20,7],[2,21,4],[2,22,2],[2,23,4]]
      this.chartsPV.setOption({
        backgroundColor: '#fff',
        visualMap: {
          max: 20,
          inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
          }
        },
        xAxis3D: {
          name: '时间',
          type: 'category',
          data: hours
        },
        yAxis3D: {
          name: '日期',
          type: 'category',
          data: days
        },
        zAxis3D: {
          name: '访问量',
          type: 'value'
        },
        grid3D: {
          boxWidth: 240,
          boxDepth: 30,
          viewControl: {
            projection: "perspective",
            alpha: -25,
            beta: 25,
            damping: 0.5,
            distance: 120
          },
          light: {
            main: {
              intensity: 2,
              shadow: this.chartsPVShadow,
              shadowQuality: 'low'
            },
            ambientCubemap: {
              texture: require('./../../assets/img/data-1491838644249-ry33I7YTe.hdr'),
              // http://gallerybox.echartsjs.com/asset/get/s/data-1491838644249-ry33I7YTe.hdr
              exposure: 1.0,
              diffuseIntensity: 0,
              specularIntensity: 2.0
            }
          },
          environment: "none",
          postEffect: {
            enable: true,
            bloom: { intensity: 0.25 },
            screenSpaceAmbientOcclusion: {
              enable: false,
              intensity: 1.5,
              radius: 5,
              quality: "low"
            },
            SSAO: {
              enable: true,
              quality: 'high',
              radius: 10,
              intensity: 2
            },
            FXAA: { enable: false },
            temporalSuperSampling: { enable: false }
          },
        },
        series: [{
          type: this.chartsPVMode,
          data: data.map(item => ({ value: [item[1], item[0], item[2]] })),
          shading: this.chartsPVColor ? 'color' : 'realistic',
          realisticMaterial: { roughness: 0.1, metalness: 1 },
          barSize: 10.5,
          bevelSize: 0.1,
          bevelSmoothness: 4,
          silent: true,
          label: {
            show: false,
            textStyle: { fontSize: 16, borderWidth: 1 }
          },
          itemStyle: { opacity: 1 },
          lineStyle: {
            width: 5,
          },
          emphasis: {
            label: {
              textStyle: {
                fontSize: 20,
                color: '#900'
              }
            },
            itemStyle: {
              color: '#900'
            }
          }
        }]
      }, {
        width: this.$refs.chartsPV.offsetWidth, 
        height: this.$refs.chartsPV.offsetHeight
      })
    }
  }
}
</script>
