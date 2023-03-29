<script setup>
import AppContainer from './AppContainer.vue';
import ImageGallery from './ImageGallery.vue';
import UserBar from './UserBar.vue';
import { ref, reactive, onMounted, watch } from "vue"
import { supabase } from "../supabase"
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const posts = ref([])
const isFollowing = ref(false)
const userStore = useUserStore()
const { user: loggedInUser } = storeToRefs(userStore)
const route = useRoute();
const user = ref(null)
const loading = ref(false)
const { username } = route.params
const userInfo = reactive({
    posts: null,
    followers: null,
    following: null
})

const addNewPost = (post) => {
    posts.value.unshift(post)
}

const updateIsFollowing = (follow) => {
    isFollowing.value = follow
}

const fetchData = async () => {
    loading.value = true
    const { data: userData } = await supabase.from("users").select().eq("username", username).single()

    if (!userData) {
        loading.value = false
        return user.value = null
    }

    user.value = userData

    const { data: postsData } = await supabase.from("posts").select().eq("owner_id", user.value.id)

    posts.value = postsData

    await fetchIsFollowing()

    const followerCount = await fetchFollowersCount()
    const followingCount = await fetchFollowingCount()

    userInfo.followers = followerCount
    userInfo.following = followingCount
    userInfo.posts = posts.value.length

    loading.value = false
}

const fetchFollowersCount = async () => {
    const { count } = await supabase.from("followers_following").select('*', { count: 'exact' }).eq("following_id", user.value.id);

    return count
}
const fetchFollowingCount = async () => {
    const { count } = await supabase.from("followers_following").select('*', { count: 'exact' }).eq("follower_id", user.value.id);

    return count
}

const fetchIsFollowing = async () => {
    if (loggedInUser.value && (loggedInUser.value.id !== user.value.id)) {
        const { data } = await supabase
            .from("followers_following")
            .select()
            .eq("follower_id", loggedInUser.value.id)
            .eq("following_id", user.value.id)
            .single();


        if (data) isFollowing.value = true
    }

}

watch(loggedInUser, () => {
    fetchIsFollowing()
})

onMounted(() => {
    fetchData()
})

</script>

<template>
    <AppContainer>
        <div v-if="!loading" class="profile-container">
            <UserBar :key="$route.params.username" :user="user" :userInfo=userInfo :addNewPost="addNewPost"
                :isFollowing="isFollowing" :updateIsFollowing="updateIsFollowing" />
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