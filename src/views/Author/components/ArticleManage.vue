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
    <br />
    <PreContextMine
      :articleList="articleListByUserId"
      @initList="getUserListByUserId"
    />
  </el-card>
</template>

<script>
import PreContextMine from '../../Mine/components/PreContextMine'
export default {
  name: 'ArticleManage',
  components: {
    PreContextMine,
  },
  data() {
    return {
      activeIndex: '1',
      articleListByUserId: [],
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getId
    },
  },
  created() {
    this.getUserListByUserId()
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    // 创作
    getUserListByUserId() {
      this.$http
        .get(`/web_blog/article/getArticleByUserId?userId=${this.userId}`)
        .then((res) => {
          if (res.data.code === 0) {
            this.articleListByUserId = res.data.data
          } else {
            this.$message({
              type: 'error',
              message: '请求用户名失败，请重新登陆',
            })
            router.push('/login')
          }
        })
        .catch((err) => {
          console.error(err)
        })
    },
  },
}
</script>

<style lang="scss" scoped></style>
