<template>
  <div class="comment">
    <p class="head">
      <UserMessageById :userId="comment.fromId" :toId="comment.toId" />
      <span
        v-if="comment.subReplyList && comment.subReplyList.length"
        @click="showCommentDetail = !showCommentDetail"
      >
        {{ showCommentDetail ? '关闭' : '展开' }}
      </span>
    </p>
    <div v-html="comment.content"></div>
    <el-button
      type="primary"
      size="mini"
      @click="showCommentAdd = !showCommentAdd"
      class="reply"
    >
      回复
    </el-button>
    <br />
    <CommentAdd
      v-if="showCommentAdd"
      :parentComment="comment"
      :article="article"
      @handleCommentAdd="closeCommentAdd"
      @reloadForum="getCommentList"
    />
    <CommentList
      v-show="showCommentDetail"
      :article="article"
      v-if="comment.subReplyList && comment.subReplyList.length"
      :comments="comment.subReplyList"
      @reloadForum="getCommentList"
    />
  </div>
</template>

<script>
import UserMessageById from '../../Mine/components/UserMessageById.vue'
import CommentAdd from './CommentAdd.vue'
const CommentList = () => import('./CommentList.vue') //异步加载组件引入解决循环引用问题
export default {
  name: 'CommentItem',
  components: {
    CommentAdd,
    CommentList,
    UserMessageById,
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
    article: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getCommentList() {
      console.log('item')
      this.$emit('reloadForum')
    },
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
