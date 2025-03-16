<template>
    <v-sheet>
        <v-data-table
            :headers="taskHeaders"
            :items="tasks"
            hide-default-footer
            density="compact"
            class="elevation-2"
            hover
        >
            <template v-slot:item.action="{ item }">
                <v-btn
                    class="solve-btn"
                    size="small"
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

const taskHeaders = ref([
    { title: 'Task Name',  value: 'name' },
    { title: 'Risk', value: 'torque' },
    { title: 'Reward', value: 'reward' },
    { title: 'Action', value: 'action', sortable: false }
]);

const tasks = [
    { name: 'Chevrolet Camaro', year: 1967, engine: 'V8', reward: 375, torque: 415 },
    { name: 'Ford Mustang', year: 1965, engine: 'V8', reward: 271, torque: 312 },
    { name: 'Dodge Charger', year: 1968, engine: 'V8', reward: 425, torque: 490 },
    { name: 'Pontiac GTO', year: 1964, engine: 'V8', reward: 350, torque: 445 },
    { name: 'Plymouth Barracuda', year: 1964, engine: 'V8', reward: 330, torque: 425 },
    { name: 'Chevrolet Chevelle SS', year: 1970, engine: 'V8', reward: 450, torque: 500 },
    { name: 'Oldsmobile 442', year: 1971, engine: 'V8', reward: 340, torque: 440 },
    { name: 'Dodge Challenger', year: 1970, engine: 'V8', reward: 425, torque: 490 },
    { name: 'AMC Javelin', year: 1968, engine: 'V8', reward: 315, torque: 425 },
    { name: 'Mercury Cougar', year: 1967, engine: 'V8', reward: 335, torque: 427 },
]

function onClick () {
    loading.value = true
    setTimeout(() => {
        loading.value = false
    }, 2000)
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
