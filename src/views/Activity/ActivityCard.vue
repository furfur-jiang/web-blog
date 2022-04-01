<template>
  <el-card style="padding: 0;">
    <!-- 220 125 -->
    <img
      :src="activity.img"
    />
    <div class="content">
      <span class="title">{{ activity.title }}</span>
      <p>
        <i class="el-icon-date"></i>
        {{ activity.time }}
      </p>
      <span>
        <i class="el-icon-position"></i>
        {{ activity.address }}
      </span>
      <el-button
        type="primary"
        size="mini"
        class="btn"
        v-if="activity.active"
        @click="go(activity.url)"
      >
        报名参加
      </el-button>
      <el-button
        type="info"
        size="mini"
        class="btn"
        @click="go(activity.url)"
        v-else
      >
        活动详情
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ActivityCard',
  props: {
    activity: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    go(path) {
      window.open(path, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
img {
  width: 220px;
  height: 125px;
}
.content {
  width: 220px;
  .title {
    font-size: 15px;
    font-weight: 700;
  }
  padding: 0 10px 10px 10px;
  & i {
    margin-right: 10px;
  }
  .btn {
    position: relative;
    bottom: 8px;
    float: right;
  }
}
</style>
<style scoped>
/deep/ .el-card__body {
  padding: 0;
}
</style>
