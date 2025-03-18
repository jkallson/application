<template>
    <div
        v-if="state !== null"
        class="game-wrapper"
    >
        <v-row>
            <!-- Status Card -->
            <v-col cols="12">
                <GameOverview :state="state"></GameOverview>
            </v-col>

            <!-- Task Table -->
            <v-col
                cols="12"
                md="9"
            >
                <v-card
                    class="task-card"
                    variant="outlined"
                >
                    <v-card-title>Select tasks for solving</v-card-title>
                    <TasksTable @restart="startGame"></TasksTable>
                </v-card>
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
                <!-- Shop Section -->
                <v-card
                    class="shop-card"
                    variant="outlined"
                    flat
                >
                    <v-card-title>Shop</v-card-title>
                    <ShopList></ShopList>
                </v-card>
            </v-col>
        </v-row>
    </div>
	<InstructionsModal :show="showInstructions" @close="() => showInstructions = false"></InstructionsModal>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue';
import TasksTable from '@/pages/dashboard/components/tasks/TasksTable.vue';
import { useGameStore } from '@/stores/gameStore';
import ShopList from '@/pages/dashboard/components/shop/ShopList.vue';
import type { Game, Reputation } from '@/types/Game';
import { GameRepository } from '@/repositories/GameRepository';
import { useRouter } from 'vue-router';
import GameOverview from '@/pages/dashboard/components/overview/GameOverview.vue';
import InstructionsModal from "@/pages/dashboard/components/modals/InstructionsModal.vue";
const router = useRouter();
const gameStore = useGameStore()
const showInstructions = ref<boolean>(false)

onMounted(async () => {
    if (gameStore.gameDomain === null) {
        await router.push('/')
        return
    }
	showInstructions.value = true
    await Promise.all([
        await gameStore.gameDomain.fetchMessages(),
        await gameStore.gameDomain.fetchShopItems()
    ])
})

const state = computed(() => {
    if (gameStore.gameDomain === null) {
        return null
    }

    return gameStore.gameDomain.state
})

const startGame = async (): Promise<void> => {
    const game: Game = await GameRepository.startGame()
    const reputation: Reputation = await GameRepository.fetchReputation(game.gameId)

    gameStore.initializeGame(game, reputation)

    await Promise.all([
        await gameStore.gameDomain.fetchMessages(),
        await gameStore.gameDomain.fetchShopItems()
    ])

    await router.push({ path: '/game', query: { id: game.gameId } });
}
</script>

<style scoped>
/* Game Wrapper */
.game-wrapper {
	background-size: cover;
	margin: auto;
	min-height: 100vh;
	padding: 20px;
	position: relative;
}

.game-wrapper > * {
	position: relative;
	z-index: 1;
}

.task-card, .shop-card {
	background: rgba(0, 0, 0, 0.9);
	border-radius: 6px;
	border: 2px solid rgba(76, 175, 80, 0.6);
}
</style>
