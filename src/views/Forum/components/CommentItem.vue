<template>
  <div class="comment">
    <div class="head">
      <UserMessageById :userId="comment.fromId" :toId="comment.toId" />
      <div>
        <span
          v-if="comment.subReplyList && comment.subReplyList.length"
          @click="showCommentDetail = !showCommentDetail"
          style="margin-right: 10px;"
        >
          <el-tooltip
            class="item"
            effect="dark"
            content="关闭回复"
            placement="bottom-start"
            v-if="showCommentDetail"
          >
            <i class="el-icon-arrow-up icon_size"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="展开回复"
            placement="bottom-start"
            v-else
          >
            <i class="el-icon-arrow-down icon_size"></i>
          </el-tooltip>
        </span>
        <el-popconfirm title="确定删除吗？" @confirm="deleteComment()">
          <i
            class="el-icon-delete icon_size"
            v-if="userId == comment.fromId"
            slot="reference"
            style="color: #ff000099;"
          ></i>
        </el-popconfirm>
      </div>
    </div>
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
  computed: {
    userId() {
      return this.$store.getters.getId
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
    async deleteComment() {
      let res = ''
      if (!this.comment.parentId) {
        res = await this.$http.delete(
          `/option/articleComment/deleteArticleComment?CommentId=${this.comment.id}`,
        )
      } else {
        res = await this.$http.delete(
          `/option/articleReply/addArticleComment?ReplyId=${this.comment.id}`,
        )
      }
      if (res.data.data) {
        this.$message({
          type: 'success',
          message: '删除评论成功',
        })
        this.getCommentList()
      } else {
        this.$message({
          type: 'error',
          message: '删除评论失败',
        })
      }
    },
  },
  mounted() {
    console.log(this.comment)
  },
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
.icon_size{
    font-size: 20px;
}
</style>
