<template>
    <v-sheet>
        <v-data-table
            v-model:sort-by="sortBy"
            :headers="taskHeaders"
            :items="gameStore.gameDomain.messages"
            hide-default-footer
            density="compact"
            class="elevation-2"
            mobile-breakpoint="md"
            hover
        >
            <template v-slot:item.action="{ item }">
                <v-btn
                    class="solve-btn"
                    color="primary"
                    size="small"
                    :disabled="isSolvingTaskInProgress || item.encrypted !== null"
                    @click="onSolveTaskPressed(item)"
                >
                    Solve
                </v-btn>
            </template>
            <template v-slot:item.probability="{ value }">
                <v-chip
                    :border="`${getColor(value)} thin opacity-25`"
                    :color="getColor(value)"
                    :text="value"
                    size="small"
                ></v-chip>
            </template>
        </v-data-table>
    </v-sheet>
    <GameOverModal
        :show="isGameOver"
        :score="gameStore.gameDomain.state.score"
        @restart="restartGame"
        @exit="exitGame"
    ></GameOverModal>
    <GameOneHpRemainingModal
        :show="isOneHpModalOpen"
        @continue="closeModalAndSolveTask(selectedTask)"
        @cancel="closeOneHpModal"
    ></GameOneHpRemainingModal>
</template>

<script setup lang="ts">
import { computed, defineEmits, ref } from 'vue'

import { useGameStore } from '@/stores/gameStore';
import { useNotification } from '@kyvg/vue3-notification';
const { notify } = useNotification()
import type { Message, MessageSolve } from '@/types/Message';
import GameOverModal from '@/pages/dashboard/components/modals/GameOverModal.vue';
import { useRouter } from 'vue-router';
import GameOneHpRemainingModal from '@/pages/dashboard/components/modals/GameOneHpRemainingModal.vue';
const router = useRouter();
const gameStore = useGameStore()

const LOW_RISK_MESSAGES: string[] = ['Piece of cake', 'Walk in the park', 'Sure thing']
const MEDIUM_RISK_MESSAGES: string[] = ['Hmmm....', 'Quite likely', 'Gamble']
const HIGH_RISK_MESSAGES: string[] = ['Rather detrimental', 'Playing with fire', 'Risky']

const taskHeaders = ref([
    { title: 'Task Name',  value: 'message', sortable: true },
    { title: 'Risk', value: 'probability', sortable: true },
    { title: 'Reward', value: 'reward', sortable: true },
    { title: 'Expires in', value: 'expiresIn', sortable: true },
    { title: 'Action', value: 'action', sortable: false }
]);

const sortBy = ref([{ key: 'reward', order: 'desc' }])
const emit = defineEmits(['restart']);

const isSolvingTaskInProgress = ref<boolean>(false)
const isOneHpModalOpen = ref<boolean>(false)
const selectedTask = ref<Message>(null)

const isGameOver: boolean = computed(() => {
    return gameStore.gameDomain.state.lives <= 0
})

const oneHpRemaining: boolean = computed(() => {
    return gameStore.gameDomain.state.lives === 1 && gameStore.gameDomain.state.gold >= 50
})

const getColor = (probability: string): string => {
    if (LOW_RISK_MESSAGES.includes(probability)) {
        return 'primary'
    } else if (MEDIUM_RISK_MESSAGES.includes(probability)) {
        return 'secondary'
    } else if(HIGH_RISK_MESSAGES.includes(probability)) {
        return 'warning'
    }

    return 'error'
}

const exitGame = (): void => {
    router.push({ path: '/' })
}

const restartGame = (): void => {
    emit('restart');
}

const closeOneHpModal = (): void => {
    isOneHpModalOpen.value = false
}

const onSolveTaskPressed = async (item: Message): Promise<void> => {
    if (oneHpRemaining.value) {
        selectedTask.value = item
        isOneHpModalOpen.value = true
    } else {
        await solveTask(item)
    }
}

const closeModalAndSolveTask = async (item: Message): Promise<void> => {
    closeOneHpModal()
    await solveTask(item)
}

const solveTask = async (item: Message): Promise<void> => {
    notify({
        title: 'Solving task...',
        type: 'info'
    })

    isSolvingTaskInProgress.value = true
    const result: MessageSolve = await gameStore.gameDomain.solveMessage(item.adId).finally(() => {
        isSolvingTaskInProgress.value = false
        selectedTask.value = null
    })

    if (result.success) {
        notify({
            title: 'Task solved!',
            text: `You earned ${item.reward} gold!`,
            type: 'success'
        })
    } else {
        notify({
            title: 'Task failed!',
            text: `You have ${result.lives} lives left...`,
            type: 'error'
        })
    }
}
</script>

<style scoped>
.solve-btn:hover {
	transform: scale(1.05);
}

.solve-btn:disabled {
	background-color: black !important;
}
</style>
