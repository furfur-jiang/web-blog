<template>
    <div class="box">
        <CommentAdd isForum="" :article="article" :root="true" />
        <CommentList :article="article" v-on="$listeners" />
    </div>
</template>

<script>
import CommentAdd from "./components/CommentAdd.vue";
import CommentList from "./components/CommentList.vue";
export default {
    components: {
        CommentAdd,
        CommentList,
    },
    props: {
        article: {
            //有则要请求
            type: Object,
            default: () => {},
        },
    },
    mounted() {
        console.log(this.article);
    },
};
</script>

<style scoped>
.box {
    width: 900px;
    min-height: 400px;
}
</style>
