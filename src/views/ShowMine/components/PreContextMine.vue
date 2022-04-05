<template>
    <div>
        <div v-for="item in articleList" :key="item.id">
            <PreContextItem v-if="item" :article="item" v-bind="$attrs" v-on="$listeners"/>
        </div>
    </div>
</template>

<script>
import PreContextItem from "@/components/PreContext/PreContextItem.vue";

export default {
    name: "PreContext",
    components: {
        PreContextItem,
    },
    data() {
        return {
            // articleList: [],
        };
    },
    props: {
        // selectId: {
        //     type: Number,
        //     default: null,
        // },
        articleList: {
            type: Array,
            default: () => [],
        },
    },
    watch: {
        // selectId: {
        //     handler() {
        //         console.log(this.selectId, this.labelId);
        //         if (this.selectId === this.labelId) {
        //             this.initList();
        //         }
        //     },
        //     immediate: true,
        // },
    },
    methods: {},
};
</script>

<style></style>