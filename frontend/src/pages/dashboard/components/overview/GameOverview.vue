<template>
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
                <GameStatusCard
                    :value="state.score"
                    label="Score"
                    icon="mdi-star"
                    color="info"
                ></GameStatusCard>
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
                <GameStatusCard
                    :value="state.gold"
                    label="Gold"
                    icon="mdi-cash"
                    color="warning"
                ></GameStatusCard>
            </v-col>
            <v-col
                cols="12"
                md="3"
            >
                <GameStatusCard
                    :value="state.turn"
                    label="Turn"
                    icon="mdi-dice-5"
                    color="secondary"
                ></GameStatusCard>
            </v-col>
            <v-col
                cols="12"
                md="3"
                class="d-flex justify-lg-space-around"
            >
                <GameStatusCard
                    class="flex-grow-1"
                    :value="state.lives"
                    label="Lives"
                    icon="mdi-heart"
                    color="error"
                    :custom-class="state.lives <= 2 ? 'danger' : ''"
                ></GameStatusCard>
                <div
                    v-if="showButton"
                    class="d-flex align-center"
                >
                    <v-tooltip
                        text="Press to go back to the main menu"
                        location="bottom"
                    >
                        <template v-slot:activator="{ props }">
                            <v-btn
                                v-bind="props"
                                size="large"
                                icon="mdi-arrow-left"
                                @click="toMainMenu"
                            ></v-btn>
                        </template>
                    </v-tooltip>
                </div>
            </v-col>
            <v-col
                v-if="!showButton"
                cols="12"
                class="d-flex justify-center"
            >
                <v-tooltip
                    text="Press to go back to the main menu"
                    location="bottom"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            size="large"
                            icon="mdi-arrow-left"
                            @click="toMainMenu"
                        ></v-btn>
                    </template>
                </v-tooltip>
            </v-col>
        </v-row>
    </v-card>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import { computed, type PropType } from 'vue';
import type { Game } from '@/types/Game';
import { useDisplay } from 'vuetify';
import GameStatusCard from '@/pages/dashboard/components/overview/GameStatusCard.vue';
const { mdAndUp } = useDisplay()
const router = useRouter();

defineProps({
    state: {
        required: true,
        type: Object as PropType<Game>
    }
})

const showButton: boolean = computed(() => {
    return mdAndUp.value
})

const toMainMenu = (): void => {
    router.push('/')
}
</script>


<style scoped>
	.status-card {
		background: rgba(0, 0, 0, 0.9);
		border-radius: 12px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
</style>
