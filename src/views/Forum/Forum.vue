<template>
  <div class="container">
    <comment :placeholder="'上传新鲜事'" @submit="submitComment"/>
  </div>
</template>

<script>
import Comment from '../../components/Comment/Comment.vue'

export default {
  components: {Comment},
  data(){
    return {
      
    }
  },
  methods:{
    submitComment(content){
      console.log(content)
    }
  }
}
</script>

<style scoped>
.container {
  width: 900px;
  height: 100vh;
}

</style>
