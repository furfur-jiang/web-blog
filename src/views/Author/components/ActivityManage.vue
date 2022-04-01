<template>
  <div>
    <div class="main" v-if="activities.length > 0">
      <div
        class="card-groups"
        v-for="activity in activities"
        :key="activity.id"
      >
        <ActivityCard :activity="activity" />
      </div>
    </div>
  </div>
</template>

<script>
import ActivityCard from '../../Activity/ActivityCard'
export default {
  components: {
    ActivityCard,
  },
  data() {
    return {
      activities: [
        {
          id: 1,
          title: '原力释放 云原生可观测性分享会',
          time: '01-11',
          address: '线上',
          url: 'https://jiangmq.blog.csdn.net/',
          img:
            'https://cdn.pixabay.com/photo/2021/12/11/15/06/northern-lights-6862969_960_720.jpg',
          active: true,
        },
        {
          id: 2,
          title: '原力释放 云原生可观测性分享会',
          time: '01-11',
          address: '深圳',
          img:
            'https://cdn.pixabay.com/photo/2021/11/30/17/06/tree-6835828_960_720.jpg',
          url: 'https://jiangmq.blog.csdn.net/',
          active: true,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.main {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(4, 220px);
  grid-template-rows: repeat(4, 220px);
  grid-row-gap: 20px;
  grid-column-gap: 10px;
}
</style>
