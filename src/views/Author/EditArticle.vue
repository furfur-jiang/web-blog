<template>
    <div>
        <div class="head">
            <el-input
                v-model="article.title"
                placeholder="请输入文章标题"
                class="inputTitle"
            />
            <!-- <span v-show="saved">保存成功</span>
            <span v-show="!saved">保存中...</span> -->
            <el-button type="primary" size="small" @click="beforeSubmit">
                发布
            </el-button>
        </div>
        <div class="markdown">
            <MarkdownPro
                :value="article.content"
                @on-ready="onReady"
                @on-copy="onCopy"
                @on-upload-image="onUploadImage"
                @on-save="onSave"
                :toolbars="toolbars"
                :autoSave="true"
                :interval="1000"
                :height="650"
            />
        </div>

        <el-dialog
            title="发布文章"
            :visible.sync="showSubmitDialog"
            width="30%"
            :before-close="handleClose"
        >
            <div class="dialog-check">
                <div class="dialog-check-item">
                    <span style="color: black">
                        <span style="color: red">*</span>
                        分类：
                    </span>
                    <div class="label-groups">
                        <el-radio-group
                            v-model="selectLabel"
                            size="small"
                            v-for="label in labelList"
                            :key="label.id"
                        >
                            <el-radio
                                class="label-tag"
                                :label="label.name"
                                border
                            ></el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <div class="dialog-check-item">
                    <span style="color: black">
                        <span style="color: red">*</span>
                        上传封面：
                    </span>

                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
            </div>
            <div class="dialog-check-item">
                <span style="color: black; width: 90px">
                    <span style="color: red">*</span>
                    摘要:
                </span>
                <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                    v-model="article.description"
                ></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showSubmitDialog = false" size="small">
                    取 消
                </el-button>
                <el-button type="primary" @click="submitArticle" size="small">
                    确定并发布
                </el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { MarkdownPro } from "vue-meditor";
import router from "@/router";

export default {
    name: "CreateArticle",
    components: {
        MarkdownPro,
    },
    data() {
        return {
            id: null,
            title: "",
            saved: false,
            insertContent: null,
            toolbars: {
                uploadImage: true,
                link: false,
                importmd: false,
            },
            showSubmitDialog: false,
            labelList: [
                // "后端",
                // "前端",
                // "开发工具",
                // "代码人生",
                // "阅读",
                // "人工智能",
                // "后端",
                // "前端",
                // "开发工具",
                // "代码人生",
                // "阅读",
            ],
            options: {},
            imageUrl: "",
            textarea: "",
            article: {},
            selectLabel: [],
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.getArticle();
        this.initLabelList();
    },
    methods: {
        // 获取标签列表
        initLabelList() {
            this.$http.get("/web_blog/articleLabel/getAllLabel").then((res) => {
                if (res.data.code === 0) {
                    this.labelList = res.data.data;
                    console.log(this.labelList);
                    this.initLabel();
                } else {
                    alert("请求标签失败，请重新登陆");
                    router.push("/login");
                    console.error("请求标签失败");
                }
            });
        },
        initLabel() {
            this.labelList.forEach((label) => {
                if (label.id == this.article.labelId) {
                    this.selectLabel = label.name;
                }
            });
        },
        // 获取此id的文章
        getArticle() {
            this.$http
                .get(`/web_blog/article/getArticleById?id=${this.id}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.article = res.data.data;
                        console.log("article", this.article);
                    } else {
                        alert("请求文章失败，请重新登陆");
                        router.push("/login");
                    }
                });
            this.isLike = this.article.like;
            this.isCollect = this.article.collect;
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === "image/jpeg";
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 JPG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 2MB!");
            }
            return isJPG && isLt2M;
        },
        // 初始化完成时触发
        onReady(data) {
            console.log(data);
            this.saved = false;
            this.insertContent = data.insertContent;
        },
        onCopy(text) {
            console.log(text);
        },
        onUploadImage(file) {
            // console.log(file)
            let form = new FormData();
            form.append("file", file);
            // console.log(form.get('file'))
            this.insertContent(
                `![image](http://localhost:8080/img/logo.82b9c7a5.png)`
            );
        },
        // 自动保存或者手动保存时触发
        onSave(data) {
            // console.log(data);
            this.article.content = data.html;
        },
        // 右上发布按钮
        beforeSubmit() {
            this.showSubmitDialog = true;
            console.log(this.article);
        },
        handleClose() {
            this.showSubmitDialog = false;
        },
        // 最后的发布按钮
        submitArticle() {
            this.article.labelId = this.handleLabel();
            this.article.userId = this.$store.getters.getId;
            console.log("article", this.article);
            this.updateArticle();
        },
        // 发送请求
        updateArticle() {
            this.$http
                .post("/web_blog/article/updateArticleById", this.article)
                .then((res) => {
                    if (res.data.code === 0) {
                        if (res.data.data === "已关注过") {
                            this.$message({
                                type: "success",
                                message: "更新成功",
                            });
                            this.handleClose();
                        }
                    } else {
                        this.$message({
                            type: "info",
                            message: "更新失败",
                        });
                    }
                });
        },
        // 获取标签名的id
        handleLabel() {
            let labelId = null;
            const selectLabel = this.selectLabel;
            this.labelList.forEach((obj) => {
                if (selectLabel === obj.name) {
                    labelId = obj.id;
                }
            });
            return labelId;
        },
    },
};
</script>

<style lang="css" scoped>
.head {
    display: flex;
    align-items: center;
    margin: 20px;
}
span {
    color: #c9cdd4;
    width: 80px;
}
/deep/ .inputTitle .el-input__inner {
    border: 0;
    font-size: 25px;
}
.label-groups {
    display: flex;
    flex-wrap: wrap;
}
.label-tag {
    width: 80px;
    margin: 0 10px 10px 0;
    text-align: center;
    cursor: pointer;
}
.dialog-check {
    display: flex;
    flex-direction: column;
}
.dialog-check-item {
    display: flex;
}

/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
/deep/ .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>