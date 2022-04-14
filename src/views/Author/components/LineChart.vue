<template>
  <div :id="id" style="width:400px;height:300px"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },
  mounted(){
    this.initChart()
  },
  props: {
    id:{
      type:String,
      dafault:''
    },
    xAxis: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
    },
  },
  methods: {
    initChart() {
      console.log(this.xAxis,this.data,this.id)
      var chartDom = document.getElementById(this.id)
      var myChart = echarts.init(chartDom)
      var option

      option = {
        title:{
          text:this.title
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xAxis,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data:this.data,
            type: 'line',
            areaStyle: {},
          },
        ],
      }

      option && myChart.setOption(option)
    },
  },
}
</script>

<style></style>
