<template>
  <div>
    <div v-for="user in userList" :key="user.id">
      <UserMessage />
    </div>
  </div>
</template>

<script>
import UserMessage from './UserMessage'
export default {
  name: 'UserList',
  components: {
    UserMessage,
  },
  data() {
    return {
      userList: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
    }
  },
}
</script>

<style lang="scss" scoped>
.user-message {
  display: flex;
  margin-bottom: 10px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
    max-width: 100%;
    max-height: 100%;
  }
  .meaasge-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px;
    .job {
      color: #4a4e58;
    }
  }
}
</style>
