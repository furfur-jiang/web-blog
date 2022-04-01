<template>
  <div class="user-message">
    <div>
      <img src="../assets/logo.png" />
      <div class="meaasge-name">
        <span>{{name}}</span>
        <span class="job">{{job}}</span>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    name:{
      type:String,
      default:'furfur'
    },
    job:{
      type:String,
      default:'前端工程师'
    }
  }
}
</script>

<style lang="scss" scoped>
.user-message {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  div{
    display: flex;
  }
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
