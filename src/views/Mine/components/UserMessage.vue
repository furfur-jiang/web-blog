<template>
  <div class="user-message">
    <div>
      <img v-if="!img" src="../../../assets/head1.png" />
      <img v-else :src="cImg" />
      <div class="message-name">
        <span>{{name}}</span>
        <span class="position">{{position}}</span>
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
      default:''
    },
    position:{
      type:String,
      default:''
    },
    img:{
      type:String,
      default:''
    }
  },
  computed:{
    cImg(){
      return this.URL+this.img
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
    max-width: 100%;
    max-height: 100%;
    display: block;
    object-fit: cover;
    text-align: center;
  }
  .message-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 10px;
    .position {
      color: #4a4e58;
    }
  }
}

</style>
