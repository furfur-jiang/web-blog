<template>
    <el-container class="contain">
        <p>
            {{ blogName }} | {{ createdTime }} |
            {{ labelName }}
        </p>
        <div class="article" @click="toArticle">
            <div>
                <h2>{{ article.title }}</h2>
                <p>
                    {{ article.description }}
                </p>
            </div>
            <!-- {{ article }} -->
            <img :src="cPicture" v-if="article.picture" class="picture" />
        </div>
        <div class="icons">
            <span>
                <img src="../../assets/eye.svg" />
                <span>{{ article.visitCount}}</span>
            </span>
            <span>
                <img src="../../assets/good.svg" />
                <span>{{ article.likeCount }}</span>
            </span>
            <span>
                <img src="../../assets/comment.svg" />
                <span>{{ article.collectCount }}</span>
            </span>
            <span v-if="isArticle">
                <el-dropdown @command="handleCommand">
                    <img src="../../assets/dot.svg" />
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="edit">编辑</el-dropdown-item>
                        <el-dropdown-item
                            command="delete"
                            :disabled="deleteDisabled"
                            >删除</el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </span>
        </div>
    </el-container>
</template>

<script>
import { formatDay } from "@/utils";
export default {
    name: "PreContextItem",
    data() {
        return {
            blogName: "",
            labelName: "",
            deleteDisabled: false,
        };
    },
    props: {
        article: {
            type: Object,
            default: () => {},
        },
    },
    mounted() {
        this.getUserById();
        this.getLabelById();
    },
    computed: {
        cPicture() {
            if (this.article.picture) {
                return this.URL + this.article.picture;
            } else {
                return null;
            }
        },
        createdTime() {
            console.log(this.article.createTime);
            return formatDay(this.article.createTime);
        },
        isArticle() {
            return this.$store.getters.getId == this.article.userId;
        },
    },
    methods: {
        // 下拉选项
        handleCommand(command) {
            if (command === "edit") {
                this.toEditArticle();
            } else {
                this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        this.deleteArticleById();
                        this.$message({
                            type: "success",
                            message: "删除成功!",
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除",
                        });
                    });
            }
        },
        // 删除文章
        deleteArticleById() {
            this.deleteDisabled = true;
            this.$http
                .delete(
                    `/web_blog/article/deleteArticleById?id=${this.article.id}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        this.deleteDisabled = false;
                        this.$emit("initList");
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
        // 去编辑创作页
        toEditArticle() {
            let id = this.article.id;
            let routerData = this.$router.resolve({
                path: `/edit-article`,
                query: { id },
            });
            window.open(routerData.href, "_blank");
        },
        // 去用户信息编辑页
        toArticle() {
            let id = this.article.id;
            let routerData = this.$router.resolve({
                path: `/article`,
                query: { id },
            });
            window.open(routerData.href, "_blank");
            // this.$router.push({ path: `/home/123` })
        },
        getUserById() {
            console.log(this.article);
            this.$http
                .get(`/web_blog/user/getUserById?id=${this.article.userId}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.blogName = res.data.data.name;
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
        getLabelById() {
            this.$http
                .get(
                    `/web_blog/articleLabel/getLabelById?id=${this.article.labelId}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        this.labelName = res.data.data.name;
                    } else {
                        alert("请求标签失败，请重新登陆");
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
.contain {
    cursor: pointer;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    width: 100%;
    .content {
        margin-bottom: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 100px;
        div {
            display: flex;
            flex-direction: column;
        }
        img {
            width: auto;
            height: auto;
            max-width: 100%;
            max-height: 100%;
        }
    }
    .icons {
        margin-bottom: 10px;
        span {
            margin-right: 10px;
            img {
                vertical-align: middle;
                margin-right: 2px;
            }
        }
    }
    .article {
        display: flex;
        justify-content: space-between;
    }
}
.contain:after {
    content: "";
    display: block;
    width: 100%;
    height: 1px;
    background: #dcdee2;
    position: relative;
    bottom: 0;
    left: 0;
}
</style>
<style scoped>
/deep/ .picture {
    width: 320px;
    height: 178px;
    display: block;
    object-fit: cover;
    text-align: center;
}
</style>