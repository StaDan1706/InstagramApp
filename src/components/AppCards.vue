<script setup>
import { supabase } from '../supabase';
import AppCard from './AppCard.vue';
import TimelineObserver from './TimelineObserver.vue'
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const posts = ref([])
const lastIndex = ref(10)
const ownerIds = ref([])
const reachEnd = ref(false)

const fetchData = async () => {
    const { data: followings } = await supabase.from("followers_following").select("following_id").eq("follower_id", user.value.id)
    ownerIds.value = followings.map(f => f.following_id)
    const { data } = await supabase.from("posts").select().in('owner_id', ownerIds.value).range(0, lastIndex.value).order("created_at", { ascending: false })

    posts.value = data
}

const fetchNextSet = async () => {
    if (!reachEnd) {
        const { data } = await supabase.from("posts").select().in('owner_id', ownerIds.value).range(lastIndex.value + 1, lastIndex.value + 10).order("created_at", { ascending: false })
        console.log("e")
        posts.value = [
            ...posts.value,
            ...data
        ]

        lastIndex.value = lastIndex.value + 10

        if (!data.length) {
            reachEnd.value = true
        }
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="timeline-container">
        <AppCard v-for="post in posts" :key="post.id" :post="post" />
        <TimelineObserver v-if="posts.length" @intersect="fetchNextSet" />
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