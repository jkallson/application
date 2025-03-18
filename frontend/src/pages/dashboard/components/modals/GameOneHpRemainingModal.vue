<template>
    <v-dialog
        :model-value="show"
        max-width="450"
        persistent
    >
        <v-card class="low-life-card">
            <v-card-title class="text-center">
                <h2>Warning!</h2>
            </v-card-title>

            <v-card-text class="text-center">
                You're down to your <strong>last life</strong>.
                <br>
                <span class="warning-text">
                    If you fail the next task, the game will be over!
                </span>
                <br>
                <br>

                <div class="purchase-option">
                    You have enough gold to purchase a
                    <strong>Healing Potion</strong>. Would you like to go back and buy one now?
                </div>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
                <v-btn
                    variant="tonal"
                    @click="continueGame"
                >
                    Continue Anyway
                </v-btn>

                <v-btn
                    variant="tonal"
                    @click="cancelTask"
                >
                    Go back
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
    show: Boolean
});

const emit = defineEmits(['continue', 'cancel']);

const continueGame = (): void => {
    emit('continue');
}

const cancelTask = (): void => {
    emit('cancel');
}
</script>

<style scoped>
.low-life-card {
	border-radius: 12px;
	border: 2px solid rgba(76, 175, 80, 0.6);
}
</style>
