<template>
  <div v-loading="chartLoading">
    <el-row>
      <el-col :md="12">
        <LineChart
          title="最近7天点赞数据"
          :xAxis="xAxis"
          :data="likeList"
          v-if="!chartLoading && likeList.length"
          id="likeChart"
        />
      </el-col>
      <el-col :md="12">
        <LineChart
          title="最近7天收藏数据"
          :xAxis="xAxis"
          :data="collectList"
          v-if="!chartLoading && collectList.length"
          id="collectChart"
        />
      </el-col>
    </el-row>
    <el-row>
      <el-col :md="12">
        <LineChart
          title="最近7天粉丝数据"
          :xAxis="xAxis"
          :data="fansList"
          v-if="!chartLoading && fansList.length"
          id="fansChart"
        />
      </el-col>
      <el-col :md="12">
        <LineChart
          title="最近7天写文章数据"
          :xAxis="xAxis"
          :data="articleList"
          v-if="!chartLoading && articleList.length"
          id="articleChart"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LineChart from './LineChart'
export default {
  components: {
    LineChart,
  },
  data() {
    return {
      xAxis: [],
      likeList: [],
      collectList: [],
      articleList: [],
      fansList: [],
      chartLoading: false,
    }
  },
  computed: {
    userId() {
      return this.$store.getters.getId
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.chartLoading = true
      this.$http
        .get(`/web_blog/articleLike/sevenLikeCount?userId=${this.userId}`)
        .then((res) => {
          let data = res.data.data
          this.xAxis = data.map((item) => item.everyDayTime)
          this.likeList = data.map((item) => item.count)
          this.chartLoading = false
        })
      this.$http
        .get(`/web_blog/articleCollect/sevenCollectCount?userId=${this.userId}`)
        .then((res) => {
          let data = res.data.data
          this.collectList = data.map((item) => item.count)
        })
      this.$http
        .get(`/web_blog/following/sevenFansCount?blogId=${this.userId}`)
        .then((res) => {
          let data = res.data.data
          this.fansList = data.map((item) => item.count)
        })
      this.$http
        .get(`/web_blog/article/sevenArticalCount?userId=${this.userId}`)
        .then((res) => {
          let data = res.data.data
          this.articleList = data.map((item) => item.count)
        })
    },
  },
}
</script>

<style></style>
