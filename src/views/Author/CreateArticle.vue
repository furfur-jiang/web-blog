<template>
  <div>
    <div class="head">
      <el-input
        v-model="article.title"
        placeholder="请输入文章标题"
        class="inputTitle"
      />
      <el-button type="primary" size="small" @click="beforeSubmit">
        发布
      </el-button>
    </div>
    <div class="markdown">
      <MarkdownPro
        :value="content"
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
          <span style="color: black;">
            <span style="color: red;">*</span>
            标签：
          </span>
          <div class="label-groups">
            <el-radio-group
              v-model="selectLabel"
              size="small"
              v-for="label in labelList"
              :key="label.id"
            >
              <el-radio class="label-tag" :label="label.name" border></el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="dialog-check-item">
          <span style="color: black;">
            <span style="color: red;">*</span>
            上传封面：
          </span>

          <el-upload
            class="avatar-uploader"
            :action="ServerUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="picture" :src="picture" class="avatar" />
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
          v-model="article.description"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSubmitDialog = false" size="small">
          取 消
        </el-button>
        <el-button
          type="primary"
          @click="submitArticle"
          size="small"
          :loading="submitLoading"
        >
          确定并发布
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import router from '@/router'
import { MarkdownPro } from 'vue-meditor'

export default {
  name: 'CreateArticle',
  components: {
    MarkdownPro,
  },
  data() {
    return {
      id: null,
      title: '',
      saved: false,
      insertContent: null,
      toolbars: {
        uploadImage: true,
        link: false,
        importmd: false,
      },
      showSubmitDialog: false,
      options: {},
      imageUrl: '',
      textarea: '',
      article: {},
      selectLabel: '',
      labelList: [],
      picture: '',
      submitLoading: false,
      content: '',
    }
  },
  created() {
    this.id = this.$route.query.id
    this.initLabelList()
    this.ServerUrl = `${this.URL}/web_blog/user/savePicture`
  },
  methods: {
    // 获取标签列表
    initLabelList() {
      this.$http.get('/web_blog/articleLabel/getAllLabel').then((res) => {
        if (res.data.code === 0) {
          this.labelList = res.data.data
        } else {
          alert('请求标签失败，请重新登陆')
          router.push('/login')
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.$message.success('上传图片成功')
      this.article.picture = res.data
      this.picture = this.URL + res.data
    },
    beforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!')
      }
      return isLt5M
    },
    // 初始化完成时触发
    onReady(data) {
      console.log(data)
      this.saved = false
      this.insertContent = data.insertContent
    },
    onCopy(text) {
      console.log(text)
    },
    async onUploadImage(file) {
      // console.log(file)
      let form = new FormData()
      form.append('file', file)
      let res = await this.$http.post('/web_blog/user/savePicture', form)
      const img = res.data.data
      this.insertContent(`![image](${this.URL}${img})`)
    },
    // 自动保存或者手动保存时触发
    onSave(data) {
      // console.log(data);
      this.article.helpContent = data.value
      this.article.content = data.html
      console.log(this.article)
    },
    // 右上发布按钮
    beforeSubmit() {
      this.showSubmitDialog = true
      console.log(this.article)
    },
    handleClose() {
      this.showSubmitDialog = false
    },
    // 最后的发布按钮
    submitArticle() {
      console.log('article', this.article)
      this.article.labelId = this.handleLabel()
      if (!this.article.labelId && this.article.labelId != 0) {
        this.$message({
          type: 'info',
          message: '请选择标签',
        })
        return
      }
      this.article.userId = this.$store.getters.getId
      console.log('article', this.article)
      this.createdArticle()
    },
    // 发送请求
    createdArticle() {
      this.submitLoading = true
      this.$http
        .post('/web_blog/article/addArticle', this.article)
        .then((res) => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '发布成功',
            })
            this.handleClose()
          } else {
            this.$message({
              type: 'error',
              message: '发布失败，请求用户名失败，请重新登陆',
            })
            // router.push("/login");
          }
          this.submitLoading = false
        })
        .catch((err) => {
          this.$message({
            type: 'info',
            message: '发布失败',
          })
          this.submitLoading = false
        })
    },
    // 获取标签名的id
    handleLabel() {
      let labelId = null
      const selectLabel = this.selectLabel
      this.labelList.forEach((obj) => {
        if (selectLabel === obj.name) {
          labelId = obj.id
        }
      })
      return labelId
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
  width: 320px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/ .avatar {
  width: 320px;
  height: 178px;
  display: block;
  object-fit: cover;
  text-align: center;
}
</style>
