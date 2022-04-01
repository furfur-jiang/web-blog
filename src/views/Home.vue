<template>
    <Tabs value="name1" style="width: 960px; overflow-y: auto">
        <!-- 循环 -->
        <TabPane label="前端" name="name1" id="1">
            <PreContext />
        </TabPane>
        <TabPane label="后端" name="name2"  id="2">
            <PreContext />
        </TabPane>
        <TabPane label="开发工具" name="name3"  id="3">
            <PreContext />
        </TabPane>
    </Tabs>
</template>

<script>
import PreContext from "../components/PreContext/PreContext.vue";
export default {
    name: "Home",
    components: {
        PreContext,
    },
    data() {
        return {
            list: [],
        };
    },
    methods: {
        initList() {
            this.list = [];
            this.$http.get("/article/getArticleByLabelId", this.registerForm).then((res) => {
                if (res.data.code === 0) {
                    this.$router.push({ path: `/home` });
                } else {
                    alert(res.data.msg);
                }
            });
        },
    },
};
</script>
