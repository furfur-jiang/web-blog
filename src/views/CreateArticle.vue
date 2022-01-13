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
      <div style="display:flex;">
        <span style="width:150px;">分类：</span>
        <div class="label-groups">
          <el-tag class="label-tag" type="info" v-for="label in labels" :key="label">
            {{ label }}
          </el-tag>
        </div>
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
    }
  },
  methods: {
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
/deep/ .el-input__inner {
  border: 0;
}
.label-groups {
  display: flex;
  flex-wrap: wrap;
}
.label-tag{
  width: 80px;
  margin: 0 10px 10px 0;
  text-align: center;
}
</style>
