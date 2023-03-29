<script setup>
import AppProfile from "../components/AppProfile.vue"
</script>

<template>
    <main>
        <AppProfile :key="$route.params.username"/>
    </main>
</template>