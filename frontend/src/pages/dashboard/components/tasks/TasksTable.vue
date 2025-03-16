<template>
    <v-sheet>
        <v-data-table
            :headers="taskHeaders"
            :items="gameStore.gameDomain.messages"
            hide-default-footer
            density="compact"
            class="elevation-2"
            hover
        >
            <template v-slot:item.action="{ item }">
                <v-btn
                    class="solve-btn"
                    size="small"
                    @click="solveTask(item)"
                >
                    Solve
                </v-btn>
            </template>
        </v-data-table>
    </v-sheet>
    <v-btn
        :disabled="loading"
        prepend-icon="mdi-refresh"
        rounded="lg"
        text="Refresh"
        variant="text"
        border
        @click="onClick"
    ></v-btn>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue'

const loading = shallowRef(false)
import { useGameStore } from '@/stores/gameStore';
import type { Message } from '@/types/Message';
const gameStore = useGameStore()

const taskHeaders = ref([
    { title: 'Task Name',  value: 'message' },
    { title: 'Risk', value: 'probability' },
    { title: 'Reward', value: 'reward' },
    { title: 'Expires in', value: 'expiresIn' },
    { title: 'Action', value: 'action', sortable: false }
]);

async function solveTask(item: Message) {
    console.log(item.adId)
    const result = await gameStore.gameDomain.solveMessage(item.adId)
    console.log(result)
}

async function onClick () {
    loading.value = true
    await gameStore.gameDomain.fetchMessages()
    loading.value = false
}
</script>

<style scoped>
/* Button Styling */
.solve-btn {
	background-color: #4CAF50;
	color: #fff;
	border: 1px solid transparent;
	border-radius: 6px;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.solve-btn:hover {
	transform: scale(1.05);
	//box-shadow: 0 6px 15px rgba(0, 255, 0, 0.6);
}
</style>
