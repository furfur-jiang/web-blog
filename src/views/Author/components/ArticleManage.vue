<template>
  <el-card>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">文章</el-menu-item>
      <el-menu-item index="2">草稿箱</el-menu-item>
    </el-menu>
    <br>
    <div v-for="item in contextList" :key="item.articleId">
      <PreContextLess />
    </div>
  </el-card>
</template>

<script>
import PreContextLess from '../../../components/PreContext/PreContextLess'
export default {
  name: 'ArticleManage',
  components: {
    PreContextLess,
  },
  data() {
    return {
      activeIndex: '1',
      contextList: [
        { articleId: 1, title: '111高频面试题之防抖节流及代码实现' },
        { articleId: 2, title: '222高频面试题之防抖节流及代码实现' },
        { articleId: 3, title: '333高频面试题之防抖节流及代码实现' },
      ],
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style lang="scss" scoped></style>
