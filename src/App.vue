<script setup>
import { onMounted } from "vue";
import NavBar from "./components/NavBar.vue";
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/users";

const userStore = useUserStore()

onMounted(() => {
  userStore.getUser()
})
</script>

<template>
  <main>
    <NavBar />
    <RouterView />
  </main>
</template>

<style scoped></style>
