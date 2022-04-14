<template>
    <div
        v-if="renderComponent"
        :class="{
            comment: true,
            subReplyList: comments && comments.length > 0,
        }"
    >
        <div v-for="item in commentsList" :key="item.id">
            <CommentItem
                :comment="item"
                :article="article"
                @reloadForum="getCommentList"
            />
        </div>
    </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";
export default {
    fromId: "CommentList",
    components: {
        CommentItem,
    },
    data() {
        return {
            commentsList: [],
            renderComponent: true,
        };
    },
    props: {
        comments: {
            type: Array,
            default: undefined,
        },
        article: {
            type: Object,
            default: () => {},
        },
    },
    mounted() {
        if (!this.comments && this.commentsList.length === 0) {
            this.getCommentList();
        } else {
            this.commentsList = this.comments;
        }
    },
    methods: {
        getCommentList() {
            this.renderComponent = false;

            let id = null;
            if (this.article) {
                id = this.article.id;
            } else {
                id = 999999999;
            }
            this.$http
                .get(
                    `/web_blog/articleComment/addArticleCommentAndReply?articleId=${id}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        console.log(res.data.data);
                        this.commentsList = res.data.data;
                        this.$nextTick(() => {
                            // 在 DOM 中添加 my-component 组件
                            this.renderComponent = true;
                        });
                    }
                });
        },
    },
};
</script>

<style scoped lang="scss">
.comment {
    padding: 5px;
    display: flex;
    flex-direction: column;
    width: 750px
}
.subReplyList {
    background: #f9fafb;
    border-radius: 2px;
}
.head {
    color: #aca9a9;
    align-items: center;
    span {
        cursor: pointer;
        margin-right: 20px;
    }
}
.reply {
    text-decoration: underline;
    color: #aca9a9;
    cursor: pointer;
}
</style>
