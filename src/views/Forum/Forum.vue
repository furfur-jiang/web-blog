<template>
  <div class="box">
    <CommentAdd isForum=""/>
    <CommentList :articleId="articleId" />
  </div>
</template>

<script>
import CommentAdd from './components/CommentAdd.vue'
import CommentList from './components/CommentList.vue'
export default {
  components: {
    CommentAdd,
    CommentList,
  },
  props: {
    articleId: {
      //有则要请求
      type: Number,
      props: 0,
    },
  },
}
</script>

<style scoped>
.box {
  width: 900px;
}
</style>
