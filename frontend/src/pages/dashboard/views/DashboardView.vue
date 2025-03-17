<template>
    <div
        v-if="state !== null"
        class="game-wrapper"
    >
        <v-row>
            <!-- Status Card -->
            <v-col cols="12">
                <v-card
                    class="status-card"
                    flat
                    variant="outlined"
                >
                    <v-row dense>
                        <v-col
                            cols="12"
                            md="3"
                        >
                            <div class="status-item">
                                <v-icon
                                    color="info"
                                    size="24"
                                >
                                    mdi-star
                                </v-icon>
                                <span class="status-value">{{ state.score }}</span>
                                <span class="status-label">Score</span>
                            </div>
                        </v-col>
                        <v-col
                            cols="12"
                            md="3"
                        >
                            <div class="status-item">
                                <v-icon
                                    color="warning"
                                    size="24"
                                >
                                    mdi-cash
                                </v-icon>
                                <span class="status-value">{{ state.gold }}</span>
                                <span class="status-label">Gold</span>
                            </div>
                        </v-col>
                        <v-col
                            cols="12"
                            md="3"
                        >
                            <div class="status-item">
                                <v-icon
                                    color="secondary"
                                    size="24"
                                >
                                    mdi-dice-5
                                </v-icon>
                                <span class="status-value">{{ state.turn }}</span>
                                <span class="status-label">Turn</span>
                            </div>
                        </v-col>
                        <v-col
                            cols="12"
                            md="3"
                        >
                            <div
                                class="status-item"
                                :class="{ danger: state.lives <= 5 }"
                            >
                                <v-icon
                                    color="error"
                                    size="24"
                                >
                                    mdi-heart
                                </v-icon>
                                <span class="status-value">{{ state?.lives }}</span>
                                <span class="status-label">Lives</span>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>
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
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import TasksTable from '@/pages/dashboard/components/tasks/TasksTable.vue';
import { useGameStore } from '@/stores/gameStore';
import ShopList from '@/pages/dashboard/components/shop/ShopList.vue';
import type { Game, Reputation } from '@/types/Game';
import { GameRepository } from '@/repositories/GameRepository';
import { useRouter } from 'vue-router';
const router = useRouter();
const gameStore = useGameStore()

onMounted(async () => {
    if (gameStore.gameDomain === null) {
        await router.push('/')
    }
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
	color: #fff;
	padding: 20px;
	position: relative;
}

.game-wrapper > * {
	position: relative;
	z-index: 1;
}

/* Status Card */
.status-card {
	background: rgba(0, 0, 0, 0.9);
	border-radius: 12px;
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.status-item {
	text-align: center;
}

.status-value {
	display: block;
	font-size: 1.8rem;
	font-weight: bold;
}

.status-label {
	display: block;
	opacity: 0.8;
}

.status-item.danger .status-value {
	color: #F44336;
	text-shadow: 0 0 12px rgba(255, 0, 0, 0.8);
}

.task-card, .shop-card {
	background: rgba(0, 0, 0, 0.9);
	border-radius: 12px;
}
</style>
