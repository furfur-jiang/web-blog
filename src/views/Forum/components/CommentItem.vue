<template>
  <div class="comment">
    <p class="head">
      <UserMessage :name="comment.name" />
      <span
        v-if="comment.subComment && comment.subComment.length"
        @click="showCommentDetail = !showCommentDetail"
      >
        展开
      </span>
    </p>
    <p>{{ comment.content }}</p>
    <el-button
      type="primary"
      size="mini"
      @click="showCommentAdd = !showCommentAdd"
      class="reply"
    >
      回复
    </el-button>
    <br>
    <CommentAdd
      v-if="showCommentAdd"
      :supId="comment.id"
      @handleCommentAdd="closeCommentAdd"
    />
    <CommentList
      v-show="showCommentDetail"
      v-if="comment.subComment && comment.subComment.length"
      :comments="comment.subComment"
    />
  </div>
</template>

<script>
import UserMessage from '../../../components/UserMessage.vue'
import CommentAdd from './CommentAdd.vue'
const CommentList = () => import('./CommentList.vue') //异步加载组件引入解决循环引用问题
export default {
  name: 'CommentItem',
  components: {
    CommentAdd,
    CommentList,
    UserMessage,
  },
  data() {
    return {
      showCommentAdd: false,
      showCommentDetail: true,
    }
  },
  props: {
    comment: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    showCommentAddFun() {
      this.showCommentAdd = true
    },
    closeCommentAdd() {
      this.showCommentAdd = false
    },
  },
  mounted() {},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.head {
  color: #aca9a9;
  display: flex;
  justify-content: space-between;

  span {
    cursor: pointer;
  }
}
.reply {
  align-self: end;
}
</style>
