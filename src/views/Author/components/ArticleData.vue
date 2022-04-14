<template>
  <div class="card-groups">
    <el-card>
      所有文章阅读数
      <h1>{{ user.visitCount }}</h1>
    </el-card>
    <el-card>
      所有文章点赞数
      <h1>{{ user.fansCount }}</h1>
    </el-card>
    <el-card>
      所有文章评论数
      <h1>{{ user.commentCount }}</h1>
    </el-card>
    <el-card>
      所有文章收藏数
      <h1>{{ user.collectCount }}</h1>
    </el-card>
    <el-card>
      总粉丝数
      <h1>{{ user.fansCount }}</h1>
    </el-card>
    <el-card class="card-item">
      总关注数
      <h1>{{ user.followingCount }}</h1>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getId
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.chartLoading = true
      this.$http
        .get(`/web_blog/userExpansion/getUserByUserId?userId=${this.userId}`)
        .then((res) => {
          this.user = res.data.data
          console.log(this.user)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.card-groups {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 270px);
  grid-template-rows: repeat(2, 100px);
  grid-gap: 20px 20px;
  > * {
    display: inline-block;
    background: #f7f8fa;
  }
}
</style>
