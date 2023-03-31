<script setup>
import AppCards from './AppCards.vue';
import AppLogInMessage from './AppLogInMessage.vue'
import AppContainer from './AppContainer.vue';
import { useUserStore } from '../stores/users';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { user, loadingUser } = storeToRefs(userStore)

</script>

<template>
    <AppContainer>
        <div v-if="!loadingUser">
            <AppCards v-if="user" />
            <AppLogInMessage v-else />
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
</style>