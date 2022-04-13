<template>
    <div v-if="userList.length">
        <div v-for="user in userList" :key="user.id">
            <UserMessage
                :name="user.name"
                :position="user.position"
                :img="user.headPortrait"
            >
                <el-button
                    v-if="attention"
                    type="info"
                    size="mini"
                    @click="focusBtn(user)"
                    :disabled="disabled"
                    >取消关注</el-button
                >
                <el-button
                    v-else
                    type="primary"
                    plain
                    size="mini"
                    :disabled="disabled"
                    @click="goIndex(user)"
                    >查看主页</el-button
                >
            </UserMessage>
        </div>
    </div>
</template>

<script>
import UserMessage from "./UserMessage";
export default {
    name: "UserList",
    components: {
        UserMessage,
    },
    data() {
        return {
            disabled: false,
        };
    },
    props: {
        attention: {
            type: Boolean,
            default: false,
        },
        userList: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        userId() {
            return this.$store.getters.getId;
        },
    },
    methods: {
        focusBtn(user) {
            this.disabled = true;
            if (!this.attention) {
                this.$http
                    .post("/web_blog/following/saveFollowing", {
                        blogId: user.id,
                        userId: this.userId,
                    })
                    .then((res) => {
                        if (res.data.code === 0) {
                            if (res.data.data === "已关注过") {
                                return;
                            } else {
                                this.isFocus = res.data.data;
                                this.$emit("getUserList");
                                this.disabled = false;
                            }
                        }
                    });
            } else {
                this.$http
                    .delete(
                        `/web_blog/following/deleteFollowingById?blogId=${user.id}&userId=${this.userId}`
                    )
                    .then((res) => {
                        if (res.data.code === 0) {
                            this.isFocus = !res.data.data;
                            this.$emit("getUserList");
                            this.disabled = false;
                        }
                    });
            }
        },
        goIndex(user){
            let id = user.id;
            let routerData = this.$router.resolve({
                path: `/show-mine`,
                query: { id },
            });
            window.open(routerData.href, "_blank");
        }
    },
};
</script>

<style lang="scss" scoped>
.user-message {
    display: flex;
    margin-bottom: 10px;
    img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
        max-width: 100%;
        max-height: 100%;
    }
    .meaasge-name {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 10px;
        .job {
            color: #4a4e58;
        }
    }
}
</style>
