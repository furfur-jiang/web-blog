<template>
  <div class="card-groups">
    <el-card class="card-item">
      总关注数
      <h1>5</h1>
    </el-card>
    <el-card>
      文章展现数
      <h1>5</h1>
    </el-card>
    <el-card>
      文章阅读数
      <h1>5</h1>
    </el-card>
    <el-card>
      文章点赞数
      <h1>5</h1>
    </el-card>
    <el-card>
      文章评论数
      <h1>5</h1>
    </el-card>
    <el-card>
      文章收藏数
      <h1>5</h1>
    </el-card>
  </div>
</template>

<script>
export default {}
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
