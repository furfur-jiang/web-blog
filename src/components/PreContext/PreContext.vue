<template>
  <div>
    <div v-for="item in list" :key="item.articleId">
      <PreContextItem :context="item" />
    </div>
  </div>
</template>

<script>
import PreContextItem from './PreContextItem.vue'
export default {
  name: 'PreContext',
  components: {
    PreContextItem,
  },
  data() {
    return {
      list: [
        {
          articleId: '1',
          article_info: {
            tag_ids: [],
            title: '',
            user_id: '',
          },
          author_user_info: {},
        },
        {
          articleId: '2',
          article_info: {
            tag_ids: [],
            title: '',
            user_id: '',
          },
          author_user_info: {},
        },
        {
          articleId: '3',
          article_info: {
            tag_ids: [],
            title: '',
            user_id: '',
          },
          author_user_info: {},
        },
      ],
    }
  },
}
</script>

<style></style>