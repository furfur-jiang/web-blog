<template>
  <div>
    <div class="head">
      <el-input
        v-model="title"
        placeholder="请输入文章标题"
        class="inputTitle"
      />
      <span v-show="saved">保存成功</span>
      <span v-show="!saved">保存中...</span>
      <el-button type="primary" size="small" @click="beforeSubmit">
        发布
      </el-button>
    </div>
    <div class="markdown">
      <MarkdownPro
        @on-ready="onReady"
        @on-copy="onCopy"
        @on-upload-image="onUpladImage"
        @on-save="onSave"
        :toolbars="toolbars"
        :autoSave="true"
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
          <span style="width: 170px; color: black;">
            <span style="color: red;">*</span>
            分类：
          </span>
          <div class="label-groups">
            <el-tag
              class="label-tag"
              type="info"
              v-for="label in labels"
              :key="label"
            >
              {{ label }}
            </el-tag>
          </div>
        </div>
        <div class="dialog-check-item">
          <span style="color: black;">
            <span style="color: red;">*</span>
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
        <span style="color: black; width: 90px;">
          <span style="color: red;">*</span>
          摘要:
        </span>
        <el-input
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
          v-model="textarea"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSubmitDialog = false" size="small">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="showSubmitDialog = false"
          size="small"
        >
          确定并发布
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { MarkdownPro } from 'vue-meditor'
export default {
  name: 'CreateArticle',
  components: {
    MarkdownPro,
  },
  data() {
    return {
      title: '',
      saved: true,
      insertContent: null,
      toolbars: {
        uploadImage: true,
        link: false,
      },
      showSubmitDialog: false,
      labels: [
        '后端',
        '前端',
        '开发工具',
        '代码人生',
        '阅读',
        '人工智能',
        '后端',
        '前端',
        '开发工具',
        '代码人生',
        '阅读',
      ],
      imageUrl: '',
      textarea: '',
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    onReady(data) {
      // console.log(data)
      this.insertContent = data.insertContent
    },
    onCopy(text) {
      console.log(text)
    },
    onUpladImage(file) {
      // console.log(file)
      let formdata = new FormData()
      formdata.append('file', file)
      // console.log(formdata.get('file'))
      this.insertContent(
        `![image](http://localhost:8080/img/logo.82b9c7a5.png)`,
      )
    },
    onSave(data) {
      console.log(data)
    },
    beforeSubmit() {
      this.showSubmitDialog = true
    },
    handleClose() {
      this.showSubmitDialog = false
    },
  },
}
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