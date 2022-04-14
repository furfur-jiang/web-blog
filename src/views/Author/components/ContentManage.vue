<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>数据概览</span>
      </div>
      <ArticleData />
    </el-card>
    <br />
    <el-card>
      <div slot="header" class="clearfix">
        <span>近七天数据变化图</span>
      </div>
      <LineCharts />
    </el-card>
  </div>
</template>

<script>
import ArticleData from './ArticleData'
import LineCharts from './LineCharts'

export default {
  name: 'ContentManage',
  components: {
    ArticleData,
    LineCharts,
  },
  data() {
    return {
      activeIndex: '1',
    }
  },
  methods: {
    handleSelect() {},
  },
}
</script>

<style lang="scss" scoped></style>
