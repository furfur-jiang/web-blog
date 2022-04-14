<template>
    <el-container class="container">
        <el-card class="menu-list">
            <UserMessage
                v-if="user.name"
                :name="user.name"
                :position="user.position"
                :img="user.headPortrait"
            />
            <el-button
                type="primary"
                style="width: 100%"
                size="small"
                @click="toCreateArticle"
            >
                写文章
            </el-button>
            <el-menu
                style="margin-top: 20px"
                default-active="2"
                :default-openeds="defaultOpeneds"
                class="el-menu-vertical"
                @open="handleOpen"
                @close="handleClose"
                router
            >
                <el-menu-item index="index" name="index">
                    <i class="el-icon-s-home"></i>
                    <span slot="title">内容数据</span>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-order"></i>
                        <span>内容管理</span>
                    </template>
                    <el-menu-item index="articleManage">文章管理</el-menu-item>
                </el-submenu>
                <!-- <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-s-marketing"></i>
                        <span>数据中心</span>
                    </template>
                    <el-menu-item index="contentManage">内容数据</el-menu-item>
                    <el-menu-item index="fansManage">关注者数据</el-menu-item>
                </el-submenu> -->
                <el-submenu index="4">
                    <template slot="title">
                        <i class="el-icon-s-flag"></i>
                        <span>活动中心</span>
                    </template>
                    <el-menu-item index="activityManage">创作活动</el-menu-item>
                </el-submenu>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-question"></i>
                        <span>帮助中心</span>
                    </template>
                    <el-menu-item index="problems">常见问题</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-card>
        <div class="main">
            <router-view />
        </div>
    </el-container>
</template>

<script>
import UserMessage from "../Mine/components/UserMessage";
import router from "@/router";
export default {
    name: "Author",
    components: {
        UserMessage,
    },
    data() {
        return {
            defaultOpeneds: ["2", "3", "4", "5"],
            user: {},
        };
    },
    created() {
        this.getUserById();
    },
    computed: {
        userId() {
            return this.$store.getters.getId;
        },
    },
    methods: {
        getUserById() {
            console.log(this.userId)
            this.$http
                .get(`/web_blog/user/getUserById?id=${this.userId}`)
                .then((res) => {
                    console.log(res)
                    if (res.data.code === 0) {
                        this.user = res.data.data;
                        console.log("user", this.user);
                    } else {
                        this.$message({
                            type:'error',
                            message:'请求用户失败，请重新登陆'
                        })
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        toCreateArticle() {
            let id = this.$store.getters.getId;
            let routerData = this.$router.resolve({
                path: `/create-article`,
                query: { id },
            });
            window.open(routerData.href, "_blank");
        },
    },
};
</script>

<style lang="scss" scoped>
.container {
    .menu-list {
        width: 250px;
        margin-right: 20px;
    }
    .main {
        width: 900px;
        height: 100vh;
    }
}
</style>
