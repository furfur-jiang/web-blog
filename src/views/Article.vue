<template>
  <el-container class="container">
    <div class="btngroups">
      <!-- TODO：查变形 -->
      <el-button style="display: none;"></el-button>
      <el-button circle>
        <img src="../assets/good-black.svg" />
      </el-button>
      <el-button circle href="#comment">
        <img src="../assets/comment-black.svg" />
      </el-button>
      <el-button circle>
        <img src="../assets/collect-black.svg" />
      </el-button>
    </div>
    <el-card class="article">
      <h1>高频面试题之防抖节流及代码实现</h1>
      <div class="user-card">
        <div class="user-message">
          <img src="../assets/logo.png" />
          <div>
            <span class="user-name">furfur</span>
            <span class="user-time">2019年10月24日 09:15 阅读1999</span>
          </div>
        </div>
        <el-button type="primary" plain size="small">+ 关注</el-button>
      </div>
      <v-html>
        {{article.content}}
      </v-html>
      <h1 style="margin:20px 0" id="comment">评论</h1>
      <Forum :articleId="this.$route.query.id"/>
    </el-card>
    <el-card class="meaasge-card">
      <UserMessage />
      <div class="partition"></div>
      <div class="message-get">
        <div class="message-get-sub">
          <div><img src="../assets/good-active.svg" /></div>
          <span>获得点赞11</span>
        </div>
        <div class="message-get-sub">
          <div><img src="../assets/eye-active.svg" /></div>
          <span>文章被阅读1234</span>
        </div>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import UserMessage from '../components/UserMessage'
import Forum from './Forum/Forum.vue'
export default {
  name: 'Article',
  components: {
    UserMessage,
    Forum
},
  data() {
    return {
      id: null,
      article:{}
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    getArticle(){
      this.article = {
        content:``,
        
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  .btngroups {
    position: fixed;
    transform: translate(-100px, 50px);
    display: flex;
    flex-direction: column;
    margin: 30px;
    > * {
      margin: 10px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.article {
  position: relative;
  width: 820px;
}

.user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  .user-message {
    display: flex;
    div {
      display: flex;
      flex-direction: column;
      margin: 0 20px;
      .user-time {
        color: #8a919f;
      }
    }
  }
  img {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    max-width: 100%;
    max-height: 100%;
  }
}
.meaasge-card {
  transform: translate(20px, 0);
  width: 250px;
  height: 180px;
  .partition:after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #dcdee2;
    position: relative;
    bottom: 0;
    left: 0;
  }
  .message-get {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
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
</style>
