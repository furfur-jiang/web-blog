<template>
  <el-container class="container">
    <div class="btngroups">
      <!-- TODO：查变形 -->
      <el-button style="display: none;"></el-button>
      <el-badge
        :value="likeNum"
        class="item"
        :type="isLike ? 'primary' : 'info'"
      >
        <el-button circle @click="likeBtn">
          <img src="../assets/good-blue.svg" v-if="isLike" />
          <img src="../assets/good-black.svg" v-else />
        </el-button>
      </el-badge>

      <el-button circle @click="toComment">
        <img src="../assets/comment-black.svg" />
      </el-button>
      <el-button circle @click="collectBtn">
        <img src="../assets/collect-yellow.svg" v-if="isCollect" />
        <img src="../assets/collect-black.svg" v-else />
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
        <el-button
          type="primary"
          plain
          size="small"
          v-if="!isFocus"
          @click="focusBtn"
        >
          + 关注
        </el-button>
        <el-button
          type="info"
          plain
          size="small"
          v-if="isFocus"
          @click="focusBtn"
        >
          取消关注
        </el-button>
      </div>
      <v-html>
        {{ article.content }}
      </v-html>
      <h1 style="margin: 20px 0;" id="comment">评论</h1>
      <Forum :articleId="Number(this.$route.query.id)" />
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
    Forum,
  },
  data() {
    return {
      id: null,
      isLike: false,
      isCollect: false,
      article: {},
      likeNum: 20,
      isFocus:false//需要请求接口判断
    }
  },
  created() {
    this.id = this.$route.query.id
  },
  methods: {
    getArticle() {
      this.article = {
        content: ``,
        like: true,
        collect: false,
      }
      this.isLike = this.article.like
      this.isCollect = this.article.collect
    },
    toComment() {
      document.getElementById('comment').scrollIntoView()
    },
    likeBtn() {
      this.isLike = !this.isLike
      if (this.isLike) {
        this.likeNum += 1
      } else {
        this.likeNum -= 1
      }
      //请求
    },
    collectBtn() {
      this.isCollect = !this.isCollect
      //请求
    },
    focusBtn(){
      this.isFocus = !this.isFocus
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

.btngroups .el-button:focus,
.btngroups .el-button:hover {
  background: #fff;
  border-color: #dcdfe6;
}
</style>
<style scoped>
/deep/ .el-badge__content.is-fixed {
  right: 15px;
  top: 8px;
}
</style>
