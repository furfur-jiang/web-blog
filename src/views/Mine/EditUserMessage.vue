<template>
  <div style="width: 800px;">
    <el-card>
      <el-button type="text" style="padding: 0;" @click="goArticleMine">
        返回个人主页
      </el-button>
    </el-card>
    <br />
    <el-card>
      <h2 class="title">个人资料</h2>
      <div style="display: flex; justify-content: space-between;">
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
          <el-form-item label="职位" prop="position">
            <el-input v-model="userForm.position"></el-input>
          </el-form-item>
          <el-form-item label="公司" prop="company">
            <el-input v-model="userForm.company"></el-input>
          </el-form-item>
          <el-form-item label="个人主页" prop="homepage">
            <el-input v-model="userForm.homepage"></el-input>
          </el-form-item>
          <el-form-item label="个人介绍" prop="desc">
            <el-input type="textarea" v-model="userForm.desc"></el-input>
          </el-form-item>
          <el-form-item prop="picture" style="display: none;">
            <el-input v-model="userForm.picture"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">
              更新
            </el-button>
            <!-- <el-button @click="resetForm('userForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="userForm.imageUrl"
            :src="userForm.imageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userForm: {
        name: '',
        position: '',
        company: '',
        homepage: '',
        desc: '',
        imageUrl: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goArticleMine() {
      this.$router.push({ path: 'mine' })
    },
  },
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 20px;
  &:after {
    content: '';
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
}
</style>
