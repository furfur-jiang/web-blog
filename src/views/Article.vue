<template>
    <el-container class="container">
        <div class="btn_groups">
            <!-- TODO：查变形 -->
            <el-button style="display: none"></el-button>
            <el-badge
                :value="article.likeCount"
                class="item"
                :type="isLike ? 'primary' : 'info'"
            >
                <el-button circle @click="likeBtn" :disabled="likeBtnDisabled">
                    <img src="../assets/good-blue.svg" v-if="isLike" />
                    <img src="../assets/good-black.svg" v-else />
                </el-button>
            </el-badge>

            <el-button circle @click="toComment">
                <img src="../assets/comment-black.svg" />
            </el-button>
            <el-badge
                :value="article.collectCount"
                class="item"
                :type="isCollect ? 'warning' : 'info'"
            >
                <el-button
                    circle
                    @click="collectBtn"
                    :disabled="collectBtnDisabled"
                >
                    <img src="../assets/collect-yellow.svg" v-if="isCollect" />
                    <img src="../assets/collect-black.svg" v-else />
                </el-button>
            </el-badge>
        </div>
        <el-card class="article">
            <h1>{{ article.title }}</h1>
            <div class="user-card">
                <div class="user-message">
                    <img
                        v-if="!blogUser.headPortrait"
                        src="@/assets/head1.png"
                    />
                    <img v-else :src="cHeadPortrait" />
                    <div>
                        <span class="user-name">{{ blogUser.name }}</span>
                        <span class="user-time">{{ createTime }} 阅读{{article.visitCount}}</span>
                        <a v-if="showEdit" @click="toEditArticle">编辑</a>
                    </div>
                </div>
                <el-button
                    type="primary"
                    plain
                    size="small"
                    v-if="!isFocus"
                    @click="focusBtn"
                    :disabled="focusBtnDisabled"
                >
                    + 关注
                </el-button>
                <el-button
                    type="info"
                    plain
                    size="small"
                    v-else
                    @click="focusBtn"
                    :disabled="focusBtnDisabled"
                >
                    取消关注
                </el-button>
            </div>
            <div v-html="article.content"></div>
            <h1 style="margin: 20px 0" id="comment">评论</h1>
            <Forum :article="article" v-if="article.id"/>
        </el-card>
        <el-card class="message-card">
            <UserMessage
                :name="blogUser.name"
                :position="blogUser.position"
                :img="blogUser.headPortrait"
            />
            <div class="partition"></div>
            <UserMoreMessage :userId="blogId" v-if="blogId" />
        </el-card>
    </el-container>
</template>

<script>
import UserMessage from "./Mine/components/UserMessage";
import Forum from "./Forum/Forum.vue";
import router from "@/router";
import { formatTime, isTrue } from "@/utils";
import UserMoreMessage from "./Mine/components/UserMoreMessage.vue";

export default {
    name: "Article",
    components: {
        UserMessage,
        Forum,
        UserMoreMessage,
    },
    data() {
        return {
            id: null,
            isLike: false,
            isCollect: false,
            article: {},
            isFocus: false, //需要请求接口判断
            blogId: null,
            blogUser: {},
            blogMoreUser: {},
            likeBtnDisabled: false,
            collectBtnDisabled: false,
            focusBtnDisabled: false,
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.getArticle();
    },
    computed: {
        createTime() {
            return formatTime(this.article.createTime);
        },
        userId() {
            return this.$store.getters.getId;
        },
        showEdit() {
            console.log(this.$store.getters.getId, this.blogId);
            return this.$store.getters.getId == this.blogId;
        },
        cHeadPortrait() {
            return this.URL + this.blogUser.headPortrait;
        },
    },
    methods: {
        // 去编辑创作页
        toEditArticle() {
            let id = this.article.id;
            let routerData = this.$router.resolve({
                path: `/edit-article`,
                query: { id },
            });
            window.open(routerData.href, "_blank");
        },
        // 获取此id的文章
        getArticle() {
            this.$http
                .get(`/web_blog/article/getArticleById?id=${this.id}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.article = res.data.data;
                        console.log("article", this.article);
                        // 初始化按钮状态
                        this.initLikeStatus();
                        this.initCollectStatus();
                        this.initFocusStatus();
                        // 获取博主信息
                        this.blogId = this.article.userId;
                        this.getUserById();
                        this.getUserMoreById();
                    } else {
                        alert("请求文章失败，请重新登陆");
                        router.push("/login");
                    }
                });
            // this.isLike = this.article.like;
            // this.isCollect = this.article.collect;
        },
        // 滚到评论区
        toComment() {
            document.getElementById("comment").scrollIntoView();
        },
        initLikeStatus() {
            this.$http
                .post("/web_blog/articleLike/isLike", {
                    articleId: this.article.id,
                    userId: this.userId,
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.code === 0) {
                        console.log("isLike", res.data.data);
                        this.isLike = isTrue(res.data.data);
                    }
                });
        },
        initCollectStatus() {
            this.$http
                .post("/web_blog/articleCollect/isCollect", {
                    articleId: this.article.id,
                    userId: this.userId,
                })
                .then((res) => {
                    if (res.data.code === 0) {
                        console.log(res.data.data);
                        this.isCollect = isTrue(res.data.data);
                    }
                });
        },
        initFocusStatus() {
            this.$http
                .post("/web_blog/following/isFollowing", {
                    blogId: this.article.userId,
                    userId: this.userId,
                })
                .then((res) => {
                    if (res.data.code === 0) {
                        this.isFocus = isTrue(res.data.data);
                    }
                });
        },
        focusBtn() {
            this.focusBtnDisabled = true;
            if (!this.isFocus) {
                this.$http
                    .post("/web_blog/following/saveFollowing", {
                        blogId: this.article.userId,
                        userId: this.userId,
                    })
                    .then((res) => {
                        if (res.data.code === 0) {
                            if (res.data.data === "已关注过") {
                                return;
                            } else {
                                this.focusBtnDisabled = false;
                                this.$message({
                                    type: "success",
                                    message: "关注成功",
                                });
                            }
                        }
                    });
            } else {
                this.$http
                    .delete(
                        `/web_blog/following/deleteFollowingById?blogId=${this.article.userId}&userId=${this.userId}`
                    )
                    .then((res) => {
                        if (res.data.code === 0) {
                            // this.isFocus = !res.data.data;
                            this.focusBtnDisabled = false;
                            this.$message({
                                type: "info",
                                message: "取消关注成功",
                            });
                        }
                    });
            }
            this.isFocus = !this.isFocus;
        },
        likeBtn() {
            this.likeBtnDisabled = true;
            if (!this.isLike) {
                this.article.likeCount += 1;
                this.$http
                    .post("/web_blog/articleLike/saveLike", {
                        articleId: this.article.id,
                        userId: this.userId,
                    })
                    .then((res) => {
                        if (res.data.code === 0) {
                            if (res.data.data === "已赞过") {
                                console.error("请求成功，但已经赞过");
                                return;
                            }
                            this.likeBtnDisabled = false;
                        }
                    });
            } else {
                this.article.likeCount -= 1;
                this.$http
                    .delete(
                        `/web_blog/articleLike/deleteLike?articleId=${this.article.id}&userId=${this.userId}`
                    )
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.likeBtnDisabled = false;
                        }
                    });
            }
            this.isLike = !this.isLike;
        },
        collectBtn() {
            this.collectBtnDisabled = true;
            if (!this.isCollect) {
                this.article.collectCount += 1;
                this.$http
                    .post("/web_blog/articleCollect/saveCollect", {
                        articleId: this.article.id,
                        userId: this.userId,
                    })
                    .then((res) => {
                        if (res.data.code === 0) {
                            if (res.data.data === "已收藏过") {
                                console.error("请求成功，但已收藏过");
                                return;
                            } else {
                                this.collectBtnDisabled = false;
                            }
                        }
                    });
            } else {
                this.article.collectCount -= 1;
                this.$http
                    .delete(
                        `/web_blog/articleCollect/deleteCollectById?articleId=${this.article.id}&userId=${this.userId}`
                    )
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.collectBtnDisabled = false;
                        }
                    });
            }
            this.isCollect = !this.isCollect;
        },
        getUserById() {
            this.$http
                .get(`/web_blog/user/getUserById?id=${this.blogId}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.blogUser = res.data.data;
                        console.log(this.blogUser);
                    } else {
                        this.$message({
                            type: "error",
                            message: "请求用户名失败，请重新登陆",
                        });
                        router.push("/login");
                        console.error("请求标签失败");
                    }
                })
                .catch((err) => {
                    alert("请求用户名失败");
                    console.error("请求用户名失败" + err);
                });
        },
        getUserMoreById() {
            this.$http
                .get(
                    `/web_blog/userExpansion/getUserByUserId?userId=${this.blogId}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        this.blogMoreUser = res.data.data;
                    } else {
                        this.$message({
                            type: "error",
                            message: "请求用户名失败，请重新登陆",
                        });
                        router.push("/login");
                        console.error("请求标签失败");
                    }
                })
                .catch((err) => {
                    alert("请求用户名失败");
                    console.error("请求用户名失败" + err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    .btn_groups {
        position: fixed;
        transform: translate(-100px, 50px);
        display: flex;
        flex-direction: column;
        margin: 30px;
        > * {
            margin: 10px 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
.article {
    position: relative;
    width: 820px;
}

.user-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;

    .user-message {
        display: flex;
        div {
            display: flex;
            flex-direction: column;
            margin: 0 20px;
            .user-time {
                color: #8a919f;
            }
        }
    }
    img {
        width: 35px;
        height: 35px;
        border-radius: 35px;
        max-width: 100%;
        max-height: 100%;
        display: block;
        object-fit: cover;
        text-align: center;
    }
}
.message-card {
    transform: translate(20px, 0);
    width: 250px;
    height: 285px;
    .partition:after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: #dcdee2;
        position: relative;
        bottom: 0;
        left: 0;
    }
    .message-get {
        display: flex;
        flex-direction: column;
        margin: 10px 0;
        .message-get-sub {
            margin: 6px 0;
            display: flex;
            div {
                background: #e1efff;
                width: 25px;
                height: 25px;
                border-radius: 25px;
                line-height: 25px;
                text-align: center;
                margin-right: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}

.btn_groups .el-button:focus,
.btn_groups .el-button:hover {
    background: #fff;
    border-color: #dcdfe6;
}
</style>
<style scoped>
/deep/ .el-badge__content.is-fixed {
    right: 15px;
    top: 8px;
}
</style>
