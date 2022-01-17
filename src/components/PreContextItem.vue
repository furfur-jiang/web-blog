<template>
  <el-container class="contain">
    <p>furfur | 2022/01/21 | 前端</p>
    <div class="content" @click="toArticle">
      <div>
        <h2>高频面试题之防抖节流及代码实现</h2>
        <p>
          内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        </p>
      </div>
      <img src="../assets/logo.png" />
    </div>
    <div class="icons">
      <span>
        <img src="../assets/eye.svg" />
        <span>20</span>
      </span>
      <span>
        <img src="../assets/good.svg" />
        <span>20</span>
      </span>
      <span>
        <img src="../assets/comment.svg" />
        <span>20</span>
      </span>
    </div>
  </el-container>
</template>

<script>
export default {
  name: 'PreContextItem',
  data() {
    return {}
  },
  props: {
    context: {
      type: Object,
      default: () => {},
    },
  },
  methods:{
    toArticle(){
      let id = 123
      let routerData = this.$router.resolve({
          path: `/article`,
          query: {id}
        });
        window.open(routerData.href, '_blank')
      // this.$router.push({ path: `/home/123` })
    }
  }
}
</script>

<style lang="scss" scoped>
.contain {
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  .content {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 100px;
    div {
      display: flex;
      flex-direction: column;
    }
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
  .icons {
    margin-bottom: 10px;
    span {
      margin-right: 10px;
      img {
        vertical-align: middle;
        margin-right: 2px;
      }
    }
  }
}
.contain:after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: #dcdee2;
    position: relative;
    bottom: 0;
    left: 0;
  }
</style>