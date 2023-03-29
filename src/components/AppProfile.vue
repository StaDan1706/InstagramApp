<script setup>
import AppContainer from './AppContainer.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';
import { ref, onMounted } from "vue"
import { supabase } from "../supabase"
import { useRoute } from 'vue-router';

const posts = ref([])
const route = useRoute();
const user = ref(null)
const loading = ref(false)
const { username } = route.params
const addNewPost = (post) => {
    posts.value.unshift(post)
}

const fetchData = async () => {
    loading.value = true
    const { data: userData } = await supabase.from("users").select().eq('username', username).single()

    if (!userData) {
        loading.value = false
        return user.value = null
    }

    user.value = userData

    const { data: postsData } = await supabase.from("posts").select().eq("owner_id", user.value.id)

    posts.value = postsData

    loading.value = false
}

onMounted(() => {
    fetchData()
})

</script>

<template>
    <AppContainer>
        <div v-if="!loading" class="profile-container">
            <UserBar :key="$route.params.username" :user="user" :userInfo="{
                posts: 4,
                followers: 100,
                following: 400

            }" :addNewPost="addNewPost" />
            <ImageGallery :posts="posts" />
        </div>
        <div v-else class="spinner">
            <ASpin />
        </div>
    </AppContainer>
</template>

<style scoped>

.spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85vh;
}
.profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}
</style>