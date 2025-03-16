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
                                    <span class="status-value">{{ score }}</span>
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
                                    <span class="status-value">{{ gold }}</span>
                                    <span class="status-label">Gold</span>
                                </div>
                            </v-col>
                            <v-col
                                cols="12"
                                md="4"
                            >
                                <div
                                    class="status-item"
                                    :class="{ danger: lives <= 5 }"
                                >
                                    <v-icon
                                        color="red"
                                        size="24"
                                    >
                                        mdi-heart
                                    </v-icon>
                                    <span class="status-value">{{ lives }}</span>
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
                        <v-list>
                            <v-list-item
                                v-for="item in shopItems"
                                :key="item.id"
                                class="shop-item"
                            >
                                <v-icon>{{ item.icon }}</v-icon>
                                <v-list-item-title>
                                    {{ item.name }} — {{ item.price }} coins
                                </v-list-item-title>
                                <v-btn
                                    color="primary"
                                    class="buy-btn"
                                >
                                    Buy
                                </v-btn>
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
const gameStore = useGameStore()

const route = useRoute()

onMounted(() => {
    console.log(gameStore.gameDomain)
    console.log(route.query)
})

const score = ref(23123);
const gold = ref(12312);
const lives = ref(5);

const shopItems = ref([
    { name: 'Healing Potion', icon: 'mdi-hospital-box', price: 50 },
    { name: 'Book of Tricks', icon: 'mdi-book-open', price: 100 },
    { name: 'Potion of Awesome Wings', icon: 'mdi-fire', price: 300 },
]);
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
