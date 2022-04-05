<template>
    <div>
        <div class="block">
            <el-carousel trigger="click" height="300px">
                <el-carousel-item
                    v-for="item in activitiesCards"
                    :key="item.id"
                >
                    <a :href="item.url" target="_blank">
                        <img
                            :src="item.img"
                            :alt="item.title"
                            :title="item.title"
                        />
                    </a>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="main" v-if="activities.length > 0">
            <div
                class="card-groups"
                v-for="activity in activities"
                :key="activity.id"
            >
                <ActivityCard :activity="activity" />
            </div>
        </div>
    </div>
</template>

<script>
import ActivityCard from "./ActivityCard.vue";
import router from "@/router";
export default {
    name: "Activity",
    components: {
        ActivityCard,
    },
    data() {
        return {
            activities: [
                // {
                //     id: 1,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     address: "线上",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     img: "https://cdn.pixabay.com/photo/2021/12/11/15/06/northern-lights-6862969_960_720.jpg",
                //     status: 0,
                // },
                // {
                //     id: 2,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     address: "深圳",
                //     img: "https://cdn.pixabay.com/photo/2021/11/30/17/06/tree-6835828_960_720.jpg",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     status: 1,
                // },
                // {
                //     id: 3,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     address: "线上",
                //     img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     status: 1,
                // },
                // {
                //     id: 4,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     address: "线上",
                //     img: "https://cdn.pixabay.com/photo/2021/11/21/21/14/mountain-6815304_960_720.jpg",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     status: 1,
                // },
                // {
                //     id: 5,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     address: "深圳",
                //     img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     status: 1,
                // },
                // {
                //     id: 6,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     address: "线上",
                //     img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     status: 1,
                // },
                // {
                //     id: 7,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg",
                //     address: "深圳",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     status: 1,
                // },
                // {
                //     id: 8,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg",
                //     address: "广州",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     active: false,
                // },
                // {
                //     id: 9,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg",
                //     address: "广州",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     active: false,
                // },
                // {
                //     id: 10,
                //     title: "原力释放 云原生可观测性分享会",
                //     time: "01-11",
                //     img: "https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455__340.jpg",
                //     address: "广州",
                //     url: "https://jiangmq.blog.csdn.net/",
                //     active: false,
                // },
            ],
        };
    },
    created() {
        this.getActivities();
    },
    computed: {
        activitiesCards: function () {
            return this.activities.slice(0, 4);
        },
    },
    methods: {
        getActivities() {
            this.$http
                .get(`/web_blog/activity/selectAllActivity`)
                .then((res) => {
                    if (res.data.code === 0) {
                        this.activities = res.data.data;
                        console.log("activities", this.activities);
                    } else {
                        alert("请求活动失败，请重新登陆");
                        router.push("/login");
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.block {
    margin: 10px 0;
    position: relative;
    img {
        z-index: 1;
        width: 100%;
        height: 100%;
    }
    h2 {
        z-index: 2;
        position: absolute;
        bottom: 10px;
        left: 10px;
        background: #d3dce6;
        border-radius: 5px;
        padding: 5px;
    }
}
.main {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(4, 220px);
    grid-template-rows: repeat(4, 240px);
    grid-row-gap: 20px;
    grid-column-gap: 10px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
