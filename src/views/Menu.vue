<template>
  <el-container>
    <el-header style="padding: 0;">
      <el-menu
      router
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item>
          <img alt="logo" src="../assets/offer.svg" style="padding: 10px;" @click="go('home')"/>
        </el-menu-item>
        <el-menu-item index="home">
          <Icon type="ios-paper" />
          首页
        </el-menu-item>
        <el-menu-item index="activity">
          <Icon type="ios-stats" />
          活动
        </el-menu-item>
        <el-menu-item index="forum">
          <Icon type="ios-people" />
          论坛
        </el-menu-item>
        <div class="headRight">
          <el-input
            placeholder="请输入内容"
            v-model="search"
            style="width: 200px;"
          >
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-button type="primary" style="margin-left: 10px;" @click="go('author')">
            创作者中心
          </el-button>
          <el-button v-if="isLogin" @click="go('mine')">个人中心</el-button>
          <el-button v-else @click="go('login')">登录</el-button>
        </div>
      </el-menu>
    </el-header>
    <el-main class="content">
      <slot></slot>
    </el-main>
  </el-container>
</template>
<script>
// import Home from './Home.vue'
export default {
  name: 'Menu',
  // components:{
  //   Home
  // },
  data() {
    return {
      activeIndex: 'home',
      search:'',
      isLogin:false
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    go(path){
      this.$router.push({ path: `/${path}` })
    }
  },
}
</script>
<style lang="scss" scoped>
.menu:after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  background: #dcdee2;
  position: absolute;
  bottom: 0;
  left: 0;
}
.headRight {
  float: right;
  line-height: 60px;
  margin-right: 10px;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
