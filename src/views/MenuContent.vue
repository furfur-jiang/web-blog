<template >
  <div>
    <Menu>
      <router-view/>
    </Menu>
  </div>
</template>
<script>
import Menu from './Menu.vue'
export default {
  name:'App',
   components: {
    Menu,
  }
}
</script>
<style lang="scss">
</style>
