<template>
  <div class="content">
    <div>
      <el-card class="main">
        <div class="user-message">
          <div style="display: flex;">
            <img src="../assets/logo.png" />
            <div class="meaasge-name">
              <h1>furfur</h1>
              <span class="job">前端工程师</span>
              <span class="job">简介</span>
            </div>
          </div>
          <el-button type="primary" plain @click="editUserMessage">编辑个人资料</el-button>
        </div>
      </el-card>
      <el-card class="underContent">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="创作文章" name="first">
            <PreContext />
          </el-tab-pane>
          <el-tab-pane label="点赞文章" name="second">
            <PreContext />
          </el-tab-pane>
          <el-tab-pane label="关注了" name="fourth">
            <UserList :attention="false" />
          </el-tab-pane>
          <el-tab-pane label="关注者" name="third">
            <UserList :attention="true" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <el-card class="rightContent">
      <div slot="header" class="clearfix">
        <h3>个人成就</h3>
      </div>
      <div class="message-get">
        <div class="message-get-sub">
          <div><img src="../assets/good-active.svg" /></div>
          <span>获得点赞11</span>
        </div>
        <div class="message-get-sub">
          <div><img src="../assets/eye-active.svg" /></div>
          <span>文章被阅读1234</span>
        </div>
        <div class="message-get-sub">
          <div><img src="../assets/comment-active.svg" /></div>
          <span>文章被评论1234</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import PreContext from '../components/PreContext.vue'
import UserList from '../components/UserList.vue'
export default {
  name: 'Mine',
  components: {
    PreContext,
    UserList,
  },
  data() {
    return {
      activeName: 'first',
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    editUserMessage(){
      this.$router.push({path:'edit-user-message'})
    }
  },
}
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
    height: 220px;
    .message-get {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
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
}
</style>
