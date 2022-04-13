<template>
    <div style="width: 800px">
        <el-card>
            <el-button type="text" style="premoveing: 0" @click="goArticleMine">
                返回个人主页
            </el-button>
        </el-card>
        <br />
        <el-card>
            <h2 class="title">个人资料</h2>
            <div style="display: flex; justify-content: space-between">
                <el-form
                    :model="userForm"
                    :rules="rules"
                    ref="userForm"
                    label-width="100px"
                    class="userForm"
                >
                    <el-form-item label="用户名" prop="name">
                        <el-input v-model="userForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-radio-group v-model="userForm.sex">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="职业" prop="position">
                        <el-input v-model="userForm.position"></el-input>
                    </el-form-item>
                    <el-form-item label="公司" prop="company">
                        <el-input v-model="userForm.company"></el-input>
                    </el-form-item>
                    <el-form-item label="个人主页" prop="homepage">
                        <el-input v-model="userForm.homepage"></el-input>
                    </el-form-item>
                    <el-form-item label="个人介绍" prop="introduction">
                        <el-input
                            type="textarea"
                            v-model="userForm.introduction"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="picture" style="display: none">
                        <el-input v-model="userForm.picture"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('userForm')"
                        >
                            更新
                        </el-button>
                        <!-- <el-button @click="resetForm('userForm')">重置</el-button> -->
                    </el-form-item>
                </el-form>
                <el-upload
                    class="avatar-uploader"
                    :action="ServerUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img
                        v-if="userForm.headPortrait"
                        :src="headPortrait"
                        class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <el-button type="text" style="premoveing: 0" @click="loginOut">
                退出登录
            </el-button>
        </el-card>
    </div>
</template>
<script>
import router from "@/router";
import {
    REMOVE_TOKEN,
    REMOVE_PHONE,
    REMOVE_ID,
    REMOVE_NAME,
} from "@/store/types";
export default {
    data() {
        return {
            headPortrait: "",
            userForm: {
                name: "",
                position: "",
                company: "",
                homepage: "",
                introduction: "",
                headPortrait: "",
                sex: null,
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 5 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {
        userId() {
            return this.$store.getters.getId;
        },
    },
    created() {
        this.initUser();
        console.log(this.URL);
        this.ServerUrl = `${this.URL}/web_blog/user/savePicture`;
    },
    methods: {
        initUser() {
            this.$http
                .get(`/web_blog/user/getUserById?id=${this.userId}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.userForm = res.data.data;
                        if (this.userForm.headPortrait) {
                            this.headPortrait =
                                this.URL + this.userForm.headPortrait;
                        }
                        console.log(this.userForm);
                    } else {
                        this.$message({
                            type: "error",
                            message: "请求用户名失败，请重新登陆",
                        });
                        router.push("/login");
                    }
                });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$http
                        .post(`/web_blog/user/updateUserById`, this.userForm)
                        .then((res) => {
                            if (res.data.code === 0) {
                                console.log(this.userForm);
                                this.initUser();
                                this.$message({
                                    type: "success",
                                    message: "更新成功",
                                });
                            } else {
                                this.$message({
                                    type: "error",
                                    message: "请求用户名失败，请重新登陆",
                                });
                                router.push("/login");
                            }
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        handleAvatarSuccess(res, file) {
            this.$message.success("上传头像图片成功");
            this.userForm.headPortrait = res.data;
            this.headPortrait = res.data;
            this.submitForm("userForm");
        },
        beforeAvatarUpload(file) {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (!isLt5M) {
                this.$message.error("上传头像图片大小不能超过 5MB!");
            }
            return isLt5M;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        goArticleMine() {
            this.$router.push({ path: "mine" });
        },
        removeUserLocal() {
            this.$store.commit(REMOVE_TOKEN);
            this.$store.commit(REMOVE_PHONE);
            this.$store.commit(REMOVE_ID);
            this.$store.commit(REMOVE_NAME);
        },
        goLogin() {
            this.$router.push({ path: "login" });
        },
        loginOut() {
            this.$confirm(
                "确定登出吗？每一片贫瘠的土地都需要坚定的挖掘者！",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true,
                }
            )
                .then(() => {
                    this.removeUserLocal();
                    this.goLogin();
                    this.$message({
                        type: "success",
                        message: "退出成功!",
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消退出",
                    });
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.title {
    margin-bottom: 20px;
    &:after {
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: #dcdee2;
        position: relative;
        bottom: -10px;
        left: 0;
    }
}
.userForm {
    width: 500px;
}
</style>

<style scoped>
/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 178px;

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
    object-fit: cover;
    text-align: center;
}
</style>
