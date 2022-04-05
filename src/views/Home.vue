<template>
    <Tabs
        :value="activeName"
        style="width: 960px; overflow-y: auto"
        @on-click="handleClick"
    >
        <!-- 循环 -->
        <TabPane
            :label="label.name"
            :name="label.id + ''"
            :id="label.id"
            v-for="label in labelList"
            :key="label.id"
        >
            <PreContext :labelId="label.id" :selectId="selectId" />
        </TabPane>
    </Tabs>
</template>

<script>
import router from "@/router";
import PreContext from "../components/PreContext/PreContext.vue";
export default {
    name: "Home",
    components: {
        PreContext,
    },
    data() {
        return {
            labelList: [],
            selectId: null,
            activeName: "",
        };
    },
    created() {
        this.initLabelList();
    },
    methods: {
        handleClick(id) {
            this.selectId = Number(id);
        },
        initLabelList() {
            this.$http.get("/web_blog/articleLabel/getAllLabel").then((res) => {
                if (res.data.code === 0) {
                    this.labelList = res.data.data;
                    if (this.labelList.length > 0) {
                        this.selectId = this.labelList[0].id;
                    }
                } else {
                    alert("请求标签失败，请重新登陆");
                    router.push("/login");
                }
            });
        },
    },
};
</script>
