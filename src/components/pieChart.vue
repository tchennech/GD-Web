<template>
  <div :id="id"
       :style="{height:height,width:width}"
       ref="myEchart">
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  name: 'pieCHart',
  props: {
    name: {
      type: String,
      default: '统计'
    },
    id: {
      type: String,
      default: 'yourID'
    },
    width: {
      type: String,
      default: '500px'
    },
    height: {
      type: String,
      default: '500px'
    },
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      chart: null
    }
  },
  mounted () {
    this.initChart()
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption({
        series: [{
          name: this.name,
          type: 'pie',
          radius: '55%',
          roseType: 'angle',
          data: this.data
        }]
      })
    }
  }
}
</script>
