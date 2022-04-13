<template>
    <div class="container">
        <comment :placeholder="'上传新鲜事'" @submit="addComment" />
    </div>
</template>

<script>
import Comment from "../../../components/Comment/Comment.vue";

export default {
    components: { Comment },
    data() {
        return {
            comment: {
                commentId: null,
                content: "",
                fromId: null,
                toId: null,
            },
        };
    },
    props: {
        closedComment: {
            type: Boolean,
            default: false,
        },
        parentComment: {
            type: Object,
            default: () => {},
        },
        article: {
            type: Object,
            default: () => {},
        },
        root: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        parentComment: function (newVal) {
            console.log(newVal);
            this.parentComment = newVal;
        },
    },
    computed: {
        userId() {
            return this.$store.getters.getId;
        },
    },
    mounted() {
        console.log(this.level);
    },
    methods: {
        async addComment(input) {
            if (!this.article) {
                this.article = {
                    id: 999999999,
                    fromId: 88888888,
                    toId: 88888888,
                };
            }
            console.log(this.parentComment);
            this.comment.content = input;
            if (this.comment.content.length <= 0) {
                alert("请输入内容");
                return;
            }
            this.comment.articleId = this.article.id;
            this.comment.fromId = this.userId;
            if (this.parentComment) {
                this.comment.toId = this.parentComment.fromId; //拿到父，去回复
                if (!this.parentComment.parentId) {
                    this.comment.commentId = this.parentComment.id;
                } else {
                    this.comment.replyId = this.parentComment.id;
                }
            }

            console.log(this.comment);
            let res = null
            if (this.root) {
                res = await this.$http.post(
                    "/web_blog/articleComment/addArticleComment",
                    this.comment
                );
                if (res.data.code === 0) {
                    this.$message({
                        type: "success",
                        message: "添加评论成功",
                    });
                }
            } else {
                res = await this.$http.post(
                    "/web_blog/articleReply/addArticleReply",
                    this.comment
                );
                if (res.data.code === 0) {
                    this.$message({
                        type: "success",
                        message: "添加回复成功",
                    });
                }
            }
            this.comment.content = "";
            console.log(res)
            this.$emit("reloadForum");
        },
    },
};
</script>

<style scoped>
.container {
    width: 85%;
}
</style>
