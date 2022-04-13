<template>
    <div class="content">
        <div>
            <el-card class="main">
                <div class="user-message">
                    <div style="display: flex">
                        <img
                            src="@/assets/head1.png"
                            v-if="!user.headPortrait"
                        />
                        <img :src="headPortrait" v-else />
                        <div class="meaasge-name">
                            <h1>{{ user.name }}</h1>
                            <span class="job">{{ user.position }}</span>
                            <span class="job">{{ user.introduction }}</span>
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
            </el-card>
            <el-card class="underContent">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="创作文章" name="1">
                        <PreContextMine
                            :articleList="articleListByUserId"
                            @initList="getUserListByUserId"
                        />
                    </el-tab-pane>
                    <el-tab-pane label="点赞文章" name="2">
                        <PreContextMine
                            :articleList="articleLikeListByUserId"
                            @initList="getUserLikeListByUserId"
                        />
                    </el-tab-pane>
                    <el-tab-pane label="收藏文章" name="3">
                        <PreContextMine
                            :articleList="articleCollectListByUserId"
                            @initList="getUserCollectListByUserId"
                        />
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
        <el-card class="rightContent">
            <div slot="header" class="clearfix">
                <h3>个人成就</h3>
            </div>
            <UserMoreMessage :userId="Number(visitId)" />
        </el-card>
    </div>
</template>

<script>
import PreContextMine from "./components/PreContextMine.vue";
import { isTrue } from "@/utils";
import router from "@/router";
import UserMoreMessage from "./components/UserMoreMessage.vue";
export default {
    name: "Mine",
    components: {
        PreContextMine,
        UserMoreMessage,
    },
    data() {
        return {
            activeName: "1",
            headPortrait:null,
            user: {
                headPortrait: null,
                id: null,
                introduction: null,
                name: null,
                phone: null,
                sex: null,
            },
            userFollowList: [],
            userFansList: [],
            userObj: {},
            articleListByUserId: [],
            articleLikeListByUserId: [],
            articleCollectListByUserId: [],
            visitId: null,
            isFocus: false,
            focusBtnDisabled: false,
        };
    },
    created() {
        this.visitId = this.$route.query.id;
        this.initUser();
        this.getUserListByUserId();
        this.getUserLikeListByUserId();
        this.getUserCollectListByUserId();
        this.initFocusStatus();
    },
    computed: {
        userId() {
            return this.$store.getters.getId;
        },
    },
    methods: {
        initFocusStatus() {
            this.$http
                .post("/web_blog/following/isFollowing", {
                    blogId: this.visitId,
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
                        blogId: this.visitId,
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
                        `/web_blog/following/deleteFollowingById?blogId=${this.visitId}&userId=${this.userId}`
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
        handleClick(tab, event) {
            console.log(tab, event);
        },
        editUserMessage() {
            this.$router.push({ path: "edit-user-message" });
        },
        initUser() {
            this.$http
                .get(`/web_blog/user/getUserById?id=${this.visitId}`)
                .then((res) => {
                    console.log(res);
                    if (res.data.code === 0) {
                        this.user = res.data.data;
                        this.headPortrait =
                            this.URL + this.user.headPortrait;
                    } else {
                        this.$message({
                                    type:'error',
                                    message:'请求用户名失败，请重新登陆'
                                })
                        router.push("/login");
                    }
                });
        },
        getFollowUserList() {
            this.$http
                .get(
                    `/web_blog/user/getFollowingByUserId?userId=${this.visitId}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        this.userFollowList = res.data.data;
                    } else {
                        alert("请求关注者失败，请重新登陆");
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        getFansUserList() {
            this.$http
                .get(`/web_blog/user/getFansByUserId?userId=${this.visitId}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.userFansList = res.data.data;
                    } else {
                        alert("请求粉丝失败，请重新登陆");
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        // 创作
        getUserListByUserId() {
            this.$http
                .get(
                    `/web_blog/article/getArticleByUserId?userId=${this.visitId}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        this.articleListByUserId = res.data.data;
                    } else {
                        this.$message({
                                    type:'error',
                                    message:'请求用户名失败，请重新登陆'
                                })
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        // 点赞
        getUserLikeListByUserId() {
            this.$http
                .get(
                    `/web_blog/article/getLikeArticleByUserId?userId=${this.visitId}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        this.articleLikeListByUserId = res.data.data;
                    } else {
                        this.$message({
                                    type:'error',
                                    message:'请求用户名失败，请重新登陆'
                                })
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        // 收藏
        getUserCollectListByUserId() {
            this.$http
                .get(
                    `/web_blog/article/getCollectArticleByUserId?userId=${this.visitId}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        this.articleCollectListByUserId = res.data.data;
                    } else {
                        this.$message({
                                    type:'error',
                                    message:'请求用户名失败，请重新登陆'
                                })
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    .main {
        width: 740px;
        margin-right: 20px;
        .user-message {
            display: flex;
            margin-bottom: 10px;
            justify-content: space-between;
            align-items: flex-start;
            img {
                width: 100px;
                height: 100px;
                border-radius: 100px;
                max-width: 100%;
                max-height: 100%;
                display: block;
                object-fit: cover;
                text-align: center;
            }
            .meaasge-name {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin: 0 10px;
                .job {
                    color: #4a4e58;
                }
            }
        }
    }
    .underContent {
        width: 740px;
        margin: 20px 20px 0 0;
    }
    .rightContent {
        width: 260px;
        height: 285px;
    }
}
</style>
