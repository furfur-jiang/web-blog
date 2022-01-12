<template>
  <div id="app">
    <Menu>
      <router-view/>
    </Menu>
  </div>
</template>
<script>
import Menu from './views/Menu.vue'
export default {
  name:'App',
   components: {
    Menu,
  }
}
</script>
<style lang="scss">
</style>
