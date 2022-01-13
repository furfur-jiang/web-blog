<template>
    <Tabs value="name1" style="width: 960px; overflow-y: auto;">
      <!-- 循环 -->
        <TabPane label="前端" name="name1">
          <PreContext />
        </TabPane>
        <TabPane label="后端" name="name2">
          <PreContext />
        </TabPane>
        <TabPane label="开发工具" name="name3">
          <PreContext />
        </TabPane>
      </Tabs>
</template>

<script>

import PreContext from '../components/PreContext.vue'
export default {
  name:'Home',
  components: {
    PreContext,
  }
}
</script>
