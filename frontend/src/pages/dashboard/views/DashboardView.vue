<template>
    <div class="game-wrapper">
        <v-container>
            <v-row>
                <!-- Status Card -->
                <v-col
                    cols="12"
                    sm="4"
                >
                    <v-card
                        class="status-card"
                        flat
                        variant="outlined"
                    >
                        <v-row dense>
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <div class="status-item">
                                    <v-icon
                                        color="blue"
                                        size="24"
                                    >
                                        mdi-star
                                    </v-icon>
                                    <span class="status-value">{{ gameStore.gameDomain.state.score }}</span>
                                    <span class="status-label">Score</span>
                                </div>
                            </v-col>
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <div class="status-item">
                                    <v-icon
                                        color="yellow"
                                        size="24"
                                    >
                                        mdi-cash
                                    </v-icon>
                                    <span class="status-value">{{ gameStore.gameDomain.state.gold }}</span>
                                    <span class="status-label">Gold</span>
                                </div>
                            </v-col>
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <div
                                    class="status-item"
                                    :class="{ danger: gameStore.gameDomain.state.lives <= 5 }"
                                >
                                    <v-icon
                                        color="red"
                                        size="24"
                                    >
                                        mdi-heart
                                    </v-icon>
                                    <span class="status-value">{{ gameStore.gameDomain.state.lives }}</span>
                                    <span class="status-label">Lives</span>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card>

                    <!-- Shop Section -->
                    <v-card
                        class="shop-card mt-4"
                        variant="outlined"
                        flat
                    >
                        <v-card-title>Shop</v-card-title>
                        <v-list density="compact">
                            <v-list-item
                                v-for="item in gameStore.gameDomain.shopItems"
                                :key="item.id"
                                :title="item.name"
                                :subtitle="`${item.cost} coins`"
                            >
                                <template v-slot:append>
                                    <v-btn
                                        class="buy-btn"
                                        size="small"
                                        @click="buyShopItem(item)"
                                    >
                                        Buy
                                    </v-btn>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>

                <!-- Task Table -->
                <v-col
                    cols="12"
                    sm="8"
                >
                    <v-card
                        class="task-card"
                        variant="outlined"
                    >
                        <v-card-title>Select tasks for solving</v-card-title>
                        <TasksTable></TasksTable>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import TasksTable from '@/pages/dashboard/components/tasks/TasksTable.vue';
import { useRoute } from 'vue-router'
import { useGameStore } from '@/stores/gameStore';
import type { ShopItem } from '@/types/Shop';
const gameStore = useGameStore()

const route = useRoute()

onMounted(async () => {
    await Promise.all([
        await gameStore.gameDomain.fetchMessages(),
        await gameStore.gameDomain.fetchShopItems()
    ])
})

async function buyShopItem(item: ShopItem) {
    await gameStore.gameDomain.buyShopItem(item)
}
</script>

<style scoped>
/* Game Wrapper */
.game-wrapper {
	background-size: cover;
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
	//border: 2px solid rgba(0, 255, 0, 0.6);
	padding: 20px;
	display: flex;
	flex-direction: column;
	gap: 15px;
	//box-shadow: 0 4px 20px rgba(0, 255, 0, 0.6);
}

.buy-btn {
	background-color: #4CAF50;
	color: #fff;
	border: 1px solid transparent;
	border-radius: 6px;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.buy-btn:hover {
	transform: scale(1.05);
	border-color: #4CAF50;
	//box-shadow: 0 6px 15px rgba(0, 255, 0, 0.6);
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
	color: #F44336; /* Red for low lives */
	text-shadow: 0 0 12px rgba(255, 0, 0, 0.8);
}

/* Task & Shop Sections */
.task-card, .shop-card {
	background: rgba(0, 0, 0, 0.9);
	border-radius: 12px;
	//box-shadow: 0 4px 15px rgba(0, 255, 0, 0.3);
}
</style>
