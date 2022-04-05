<template>
    <div v-if="articleList.length>0">
        <div v-for="item in articleList" :key="item.articleId">
            <PreContextItem v-if="item" :article="item" v-bind="$attrs" @initList="initList"/>
        </div>
    </div>
</template>

<script>
import PreContextItem from "./PreContextItem.vue";
import router from "@/router";

export default {
    name: "PreContext",
    components: {
        PreContextItem,
    },
    data() {
        return {
            articleList: [],
            userList: [],
        };
    },
    props: {
        selectId: {
            type: Number,
            default: null,
        },
        labelId: {
            type: Number,
            default: null,
        },
    },
    watch: {
        selectId: {
            handler() {
                console.log(this.selectId, this.labelId);
                if (this.selectId === this.labelId) {
                    this.initList();
                }
            },
            immediate: true,
        },
    },
    methods: {
        initList() {
            this.$http
                .get(
                    `/web_blog/article/getArticleByLabelId?labelId=${this.labelId}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        this.articleList = res.data.data;
                        console.log(this.articleList);
                    } else {
                        alert("请求用户名失败，请重新登陆");
                        router.push("/login");
                    }
                });
        },
    },
};
</script>

<style></style>