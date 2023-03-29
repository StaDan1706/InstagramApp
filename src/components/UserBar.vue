<script setup>
import { defineProps } from 'vue';
import UploadPhotoModalVue from './UploadPhotoModal.vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const route = useRoute();
const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const { username: profileUsername } = route.params

const props = defineProps(['user', 'userInfo', 'addNewPost'])
</script>

<template>
    <div class="userbar-container" v-if="props.user">
        <div class="top-content">
            <ATypographyTitle :level="2">{{ props.user.username }}</ATypographyTitle>
            <div v-if="user">
                <UploadPhotoModalVue :addNewPost="addNewPost" v-if="profileUsername === user.username" />
                <AButton v-else>Follow</AButton>
            </div>
        </div>

        <div class="bottom-content">
            <ATypographyTitle :level="5">{{ props.userInfo.posts }} posts</ATypographyTitle>
            <ATypographyTitle :level="5">{{ props.userInfo.followers }} followers</ATypographyTitle>
            <ATypographyTitle :level="5">{{ props.userInfo.following }} following</ATypographyTitle>

        </div>
    </div>
    <div class="userbar-container" v-else>
        <div class="top-content">
            <ATypographyTitle :level="2">User Not Found</ATypographyTitle>
        </div>
    </div>
</template>

<style scoped>
.userbar-container {
    padding-bottom: 75px;
}

.bottom-content {
    display: flex;
    align-items: center;
}

.bottom-content h5 {
    margin: 0 !important;
    padding: 0;
    margin-right: 30px !important;
}

.top-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
}
</style>