<template>
  <div class="block">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="fontsize: 17px;">创造活动</span>
        <el-button
          style="float: right; padding: 3px 0;"
          type="text"
          @click="go('activityManage')"
        >
          查看更多
        </el-button>
      </div>
      <!-- TODO:轮播换图片 -->
      <el-carousel height="200px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span style="fontsize: 17px;">数据概览</span>
        <el-button
          style="float: right; padding: 3px 0;"
          type="text"
          @click="go('contentManage')"
        >
          查看更多
        </el-button>
      </div>
      <ArticleData />
    </el-card>
    <el-card class="box-card" style="margin-top: 20px;">
      <div slot="header" class="clearfix">
        <span style="fontsize: 17px;">近期发布</span>
        <el-button
          style="float: right; padding: 3px 0;"
          type="text"
          @click="go('articleManage')"
        >
          查看更多
        </el-button>
      </div>
      <div v-for="item in contextList" :key="item.articleId">
        <PreContextLess />
      </div>
    </el-card>
  </div>
</template>

<script>
import PreContextLess from '../../components/PreContextLess'
import ArticleData from '../../components/ArticleData'
export default {
  name: 'Index',
  components: {
    PreContextLess,
    ArticleData,
  },
  data() {
    return {
      contextList: [
        { articleId: 1, title: '111高频面试题之防抖节流及代码实现' },
        { articleId: 2, title: '222高频面试题之防抖节流及代码实现' },
        { articleId: 3, title: '333高频面试题之防抖节流及代码实现' },
      ],
    }
  },
  methods: {
    go(path) {
      this.$router.push({ path: `/${path}` })
    },
  },
}
</script>

<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
