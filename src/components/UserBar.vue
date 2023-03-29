<script setup>
import { defineProps } from 'vue';

const props = defineProps(['username', 'userInfo'])
</script>

<template>
    <div class="userbar-container">
        <div class="top-content">
            <ATypographyTitle :level="2">{{props.username}}</ATypographyTitle>

        </div>
    </div>
    <div class="bottom-content">
        <ATypographyTitle :level="5">{{ props.userInfo.posts }} posts</ATypographyTitle>
        <ATypographyTitle :level="5">{{ props.userInfo.followers }} followers</ATypographyTitle>
        <ATypographyTitle :level="5">{{ props.userInfo.following }} following</ATypographyTitle>

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


</style>