<template>
    <div>
        <UserMessage
            v-if="user.name && !toId"
            :name="user.name"
            :position="user.position"
            :img="user.headPortrait"
        />
        <UserMessageAndTo
            v-if="user.name && toId"
            :name="user.name"
            :position="user.position"
            :img="user.headPortrait"
            :toName="toUser.name"
            :toPosition="toUser.position"
            :toImg="toUser.headPortrait"
        />
    </div>
</template>

<script>
import router from '@/router';
import UserMessage from "./UserMessage.vue";
import UserMessageAndTo from "./UserMessageAndTo.vue";
export default {
    data() {
        return {
            user: {
                name: "",
                position: "",
                headPortrait: "",
            },
            toUser: {
                name: "",
                position: "",
                headPortrait: "",
            },
        };
    },
    components: {
        UserMessage,
        UserMessageAndTo,
    },
    props: {
        userId: {
            type: Number,
            default: 0,
        },
        toId: {
            type: Number,
            default: 0,
        },
    },
    watch: {},
    mounted() {
        console.log(this.userId,this.toId);
        this.getUserById(this.userId, 'user');
        if (this.toId) {
            this.getUserById(this.toId, 'toUser');
        }
    },
    methods: {
        getUserById(id, user) {
            this.$http
                .get(`/web_blog/user/getUserById?id=${id}`)
                .then((res) => {
                    if (res.data.code === 0) {
                        this[user] = res.data.data;
                        console.log(this)
                    } else {
                        this.$message({
                            type: "error",
                            message: "请求用户失败，请重新登陆",
                        });
                        router.push("/login");
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
};
</script>

<style>
</style>