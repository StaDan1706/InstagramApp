<script setup>
import { supabase } from '../supabase';
import AppCard from './AppCard.vue';
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const posts = ref([])

const fetchData = async () => {
    const { data: followings } = await supabase.from("followers_following").select("following_id").eq("follower_id", user.value.id)
    const onwer_ids = followings.map(f => f.following_id)
    const {data} = await supabase.from("posts").select().in('owner_id', onwer_ids).order("created_at", {ascending: false})

    posts.value = data
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="timeline-container">
        <AppCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
</template>

<style scoped>
.timeline-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
}
</style>