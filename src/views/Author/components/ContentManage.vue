<template>
  <el-card>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">文章数据</el-menu-item>
    </el-menu>
    <br />
    <ArticleData />
  </el-card>
</template>

<script>
import ArticleData from '../../../components/ArticleData'

export default {
  name: 'ContentManage',
  components: {
    ArticleData,
  },
  data() {
    return {
      activeIndex: '1',
    }
  },
}
</script>

<style lang="scss" scoped></style>
