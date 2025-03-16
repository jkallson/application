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
                        <ShopList></ShopList>
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
import { onMounted } from 'vue';
import TasksTable from '@/pages/dashboard/components/tasks/TasksTable.vue';
import { useGameStore } from '@/stores/gameStore';
import ShopList from '@/pages/dashboard/components/shop/ShopList.vue';
const gameStore = useGameStore()

onMounted(async () => {
    await Promise.all([
        await gameStore.gameDomain.fetchMessages(),
        await gameStore.gameDomain.fetchShopItems()
    ])
})
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
