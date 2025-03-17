<template>
    <v-dialog
        :model-value="show"
        max-width="400"
        persistent
    >
        <v-card class="game-over-card">
            <v-card-title class="text-center">
                <v-icon
                    color="error"
                    size="48"
                >
                    mdi-skull-crossbones
                </v-icon>
                <h2>Game Over</h2>
            </v-card-title>

            <v-card-text class="text-center">
                Your journey has ended. You scored <strong>{{ score }}</strong> points.
            </v-card-text>

            <v-card-actions class="justify-center">
                <v-btn
                    variant="tonal"
                    @click="restartGame"
                >
                    Restart Game
                </v-btn>
                <v-btn
                    variant="tonal"
                    @click="exitGame"
                >
                    Exit
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
    show: Boolean,
    score: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['restart', 'exit']);

const restartGame = (): void => {
    emit('restart');
}

const exitGame = (): void => {
    emit('exit');
}
</script>

<style scoped>
.game-over-card {
	background: rgba(0, 0, 0, 0.9);
	color: #fff;
	border-radius: 12px;
}
</style>
