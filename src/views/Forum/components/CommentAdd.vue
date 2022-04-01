<template>
  <div class="container">
    <comment :placeholder="'上传新鲜事'" @submit="addComment" />
  </div>
</template>

<script>
import Comment from '../../../components/Comment/Comment.vue'

export default {
  components: { Comment },
  data() {
    return {
      comment: {
        // id: Math.random(), //TODO：复用子组件导致重复id，先以输入不同内容拼接
        sup: null,
        name: 'fur2',
        time: '1641627103',
        content: '',
        subComment: [],
      },
    }
  },
  props: {
    closedComment: {
      type: Boolean,
      default: false,
    },
    supId: {
      type: String,
      default: '',
    },
  },
  watch: {
    supId: function (newVal) {
      console.log(newVal)
    },
  },
  methods: {
    addComment(input) {
      this.comment.content = input
      console.log('supId', this.supId)
      if (this.comment.content.length <= 0) {
        alert('请输入内容')
        return
      }
      if (this.supId) {
        this.comment.sup = this.supId
      }
      // this.comment.id = this.comment.id + this.comment.content //TODO:随机性不随机
      let comment = JSON.parse(JSON.stringify(this.comment))
      console.log(comment)
      // this.$store.commit('addComment', comment)
      this.comment.content = ''
      this.$emit('handleCommentAdd')
    },
  },
}
</script>

<style scoped>
.container {
  width: 900px;
}
</style>
