<template>
  <el-collapse v-model="activeNames" @change="handleChange" style="margin-top: 20px;">
    <el-collapse-item title="哪些因素会影响你文章的曝光？" name="1">
      <div>
        1.
        您的文章的平均点赞数、阅读数、评论数：你的文章点赞数、阅读数、评论数越高，内容将会获得更多的曝光。
        2. 您写文章的活跃度：你越频繁地更文，将会获得越多的内容曝光。 3.
        文章的标签：掘金的标签是定义内容的一个内容指向标签，因而在我们计算文章相关性中，此类标签有非常重要的功能，在您发布内容时，请务必填写合适的标签。
        4.
        编辑的推荐：小编们会一直在社区里发现优质的用户和内容，我们坚持严格的筛选标准。
      </div>
    </el-collapse-item>
    <el-collapse-item title="什么样的文章会被推荐？" name="2">
      <div>
        1. 内容形式：对他人有启发性且必须原创或者本人翻译的文章。
        2.排版要求：行文排版优雅。
        3.题材要求：原则上不限制具体题材，但是文章要符合与开发相关的技术细节、技巧干货、开源工具介绍、实践总结、行业见解、职业选择等方向；当然也可以是优秀的翻译文章，这方面可以参考官方在运营的［翻译计划］。
        4.符合标准的引流规范：稀土掘金作为一个帮助开发者成长的技术社区，我们原则上不支持这一行为，但是本着服务用户的原则我们也不禁止这一行为。为了帮助用户拥有更好的阅读体验，我们现对张贴公众号行为作出以下规范：可以是文字引导用户关注公众号，但是对于添加个人微信账号、引导用户进群、推广产品等威胁用户信息安全的行为一律禁止。
      </div>
      <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
export default {
  data() {
    return {
      activeNames: ['1'],
    }
  },
  methods: {
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>

<style lang="scss" scoped></style>
