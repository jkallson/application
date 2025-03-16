<template>
    <v-list density="compact">
        <ShopListItem
            v-for="item in gameStore.gameDomain.shopItems"
            :key="item.id"
            :item="item"
        ></ShopListItem>
    </v-list>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/GameStore';
import ShopListItem from '@/pages/dashboard/components/shop/ShopListItem.vue';
const gameStore = useGameStore()

</script>

<style scoped>

</style>
