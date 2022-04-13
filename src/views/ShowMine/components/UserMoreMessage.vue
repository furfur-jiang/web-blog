<template>
    <div class="message-get">
        <div class="message-get-sub">
            <div><img src="@/assets/good-active.svg" /></div>
            <span>总共获得点赞: {{ blogMoreUser.likeCount }}</span>
        </div>
        <div class="message-get-sub">
            <div><img src="@/assets/eye-active.svg" /></div>
            <span>总共文章被阅读: {{ blogMoreUser.visitCount }}</span>
        </div>
        <div class="message-get-sub">
            <div><img src="@/assets/collect-active.svg" /></div>
            <span>总共获得收藏: {{ blogMoreUser.collectCount }}</span>
        </div>
        <div class="message-get-sub">
            <div><img src="@/assets/fan-active.svg" /></div>
            <span>总共粉丝数: {{ blogMoreUser.fansCount }}</span>
        </div>
        <div class="message-get-sub">
            <div><img src="@/assets/follow-active.svg" /></div>
            <span>总共关注了: {{ blogMoreUser.followingCount }}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            blogMoreUser: {},
        };
    },
    props: {
        userId: {
            type: Number,
            default: null,
        },
    },
    mounted() {
        this.getUserMoreById();
    },
    methods: {
        getUserMoreById() {
            this.$http
                .get(
                    `/web_blog/userExpansion/getUserByUserId?userId=${this.userId}`
                )
                .then((res) => {
                    if (res.data.code === 0) {
                        this.blogMoreUser = res.data.data;
                        console.log('blogMoreUser',this.blogMoreUser)
                    } else {
                        this.$message({
                                    type:'error',
                                    message:'请求用户名失败，请重新登陆'
                                })
                        router.push("/login");
                        console.error("请求标签失败");
                    }
                })
                .catch((err) => {
                    alert("请求用户名失败");
                    console.error("请求用户名失败" + err);
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.message-get {
    display: flex;
    flex-direction: column;
    .message-get-sub {
        margin: 6px 0;
        display: flex;
        div {
            background: #e1efff;
            width: 25px;
            height: 25px;
            border-radius: 25px;
            line-height: 25px;
            text-align: center;
            margin-right: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>