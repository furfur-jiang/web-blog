<template>
  <div :class="{ comment: true, subComment: comments && comments.length > 0 }">
    <div v-for="item in commentsList" :key="item.id">
      <CommentItem :comment="item" />
    </div>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem,
  },
  data() {
    return {
      commentsList: [],
    }
  },
  props: {
    comments: {
      type: Array,
      props: () => [],
    },
    articleId:{//有则要请求
        type:Number,
        props:0
    }
  },
  mounted() {
    if (!this.comments) {
      this.commentsList = [
        {
          id: '1',
          name: 'fur',
          time: '1641645103',
          content: '111',
          sup: null,
          subComment: [
            {
              id: '4',
              name: 'furSub',
              time: '1641652303',
              content: '444',
              subComment: [
                {
                  id: '7',
                  name: 'furSub',
                  time: '1641652303',
                  content: '777',
                  subComment: [],
                  sup: '4',
                },
              ],
              sup: '1',
            },
            {
              id: '6',
              name: 'furSub',
              time: '1641652303',
              content: '666',
              subComment: [],
              sup: '1',
            },
          ],
        },
        {
          id: '2',
          sup: null,
          name: 'fur2',
          time: '1641627103',
          content: '222',
          subComment: [
            {
              id: '5',
              name: 'fur1Sub',
              time: '1641652303',
              content: '555',
              subComment: [],
              sup: '2',
            },
          ],
        },
        {
          id: '3',
          sup: null,
          name: 'fur3',
          time: '1641616303',
          content: '333',
          subComment: [],
        },
      ]
    } else {
      this.commentsList = this.comments
    }
  },
}
</script>

<style scoped lang="scss">
.comment {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.subComment {
  background: #f9fafb;
  border-radius: 2px;
  margin-left: 50px;
}
.head {
  color: #aca9a9;
  align-items: center;
  span {
    cursor: pointer;
    margin-right: 20px;
  }
}
.reply {
  text-decoration: underline;
  color: #aca9a9;
  cursor: pointer;
}
</style>
