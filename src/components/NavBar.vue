<script setup>
import { RouterLink, useRouter } from "vue-router"
import AppContainer from "./AppContainer.vue"
import AuthModal from "./AuthModal.vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const userStore = useUserStore()

const { user, loadingUser } = storeToRefs(userStore)
const router = useRouter()
const searchUsername = ref("")

const onSearch = () => {
    if (searchUsername.value) {
        router.push(`/profile/${searchUsername.value}`)
        searchUsername.value = ''
    }
}

const handleLogout = async () => {
    await userStore.handleLogout()
}

const goToUserProfile = () => {
    router.push(`/profile/${user.value.username}`)
}
</script>
<template>
    <ALayoutHeader>
        <AppContainer>
            <div class="nav-container">
                <div class="right-content">
                    <RouterLink to="/">Instagram</RouterLink>
                    <AInputSearch v-model:value="searchUsername" placeholder="username..." style="width: 200px"
                        @search="onSearch" />
                </div>
                <div class="content" v-if="!loadingUser">
                    <div class="left-content" v-if="!user">
                        <AuthModal :isLogin="false" />
                        <AuthModal :isLogin="true" />
                    </div>
                    <div class="left-content" v-else>
                        <AButton type="primary" @click="goToUserProfile">Profile</AButton>
                        <AButton type="primary" @click="handleLogout">Logout</AButton>
                    </div>
                </div>
            </div>
        </AppContainer>
    </ALayoutHeader>
</template>

<style scoped>
.content {
    display: flex;
    align-items: center;
}

.nav-container {
    display: flex;
    justify-content: space-between;
}

.right-content {
    display: flex;
    align-items: center;
}

.right-content a {
    margin-right: 10px;
}

.left-content {
    display: flex;
    align-items: center;
}

.left-content button {
    margin-left: 10px;
}
</style>