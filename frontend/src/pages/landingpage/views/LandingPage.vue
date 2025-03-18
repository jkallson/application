<template>
    <v-container class="landing-page-content">
        <!-- Hero Section -->
        <v-row class="text-center hero-section">
            <v-col cols="12">
                <div>
                    <h1 class="game-title">
                        <div class="dragon-logo">
                            🐉
                        </div>
                        Dragons of Mugloar
                    </h1>
                    <p class="game-subtitle">
                        Embark on an epic adventure filled with mystery, strategy, and heroic quests!
                    </p>
                </div>
                <v-btn
                    color="primary"
                    size="x-large"
                    elevation="4"
                    class="cta-button"
                    @click="startGame"
                >
                    Start Your Journey
                </v-btn>
            </v-col>
        </v-row>

        <!-- Feature Section -->
        <v-row class="feature-section">
            <v-col
                v-for="(feature, index) in features"
                :key="index"
                cols="12"
                md="4"
            >
                <transition name="fade-in">
                    <v-card class="pa-4 feature-card">
                        <v-icon
                            :color="feature.color"
                            size="50"
                        >
                            {{ feature.icon }}
                        </v-icon>
                        <h3>{{ feature.title }}</h3>
                        <p>{{ feature.description }}</p>
                    </v-card>
                </transition>
            </v-col>
        </v-row>
    </v-container>
    <Loader
        :loading="loading"
        message="Summoning the Dragons..."
    ></Loader>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import { GameRepository } from '@/repositories/GameRepository';
import type { Game, Reputation } from '@/types/Game';
import { useGameStore } from '@/stores/gameStore';


const router = useRouter();
const loading = ref<boolean>(false);
const gameStore = useGameStore();

const startGame = async () => {
    loading.value = true
    const game: Game = await GameRepository.startGame()
    const reputation: Reputation = await GameRepository.fetchReputation(game.gameId)

    gameStore.initializeGame(game, reputation)
    loading.value = false

    await router.push({ path: '/game', query: { id: game.gameId } });
};


const features: { icon: string, title: string, description: string, color: string }[] = [
    {
        icon: 'mdi-sword',
        title: 'Quests & Adventures',
        description: 'Engage in thrilling tasks that challenge your strategy and bravery.',
        color: 'success',
    },
    {
        icon: 'mdi-cash',
        title: 'Manage Resources',
        description: 'Earn gold, purchase powerful items, and upgrade wisely.',
        color: 'warning',
    },
    {
        icon: 'mdi-heart',
        title: 'Survive the Challenges',
        description: 'Every decision matters — manage your lives carefully.',
        color: 'error',
    }
];
</script>

<style scoped>
.landing-page-content {
	position: relative;
	z-index: 1;
	color: #fff;
	text-shadow: 3px 3px 8px rgba(0, 0, 0, 0.8);
}

.hero-section {
	margin-bottom: 40px;
}

.game-title {
	font-size: 4.5rem;
	font-weight: bold;
}

.game-subtitle {
	font-size: 1.6rem;
	max-width: 600px;
	margin: 0 auto 24px;
	color: #fff;
	font-weight: 600;
}

.dragon-logo {
	animation: glow-spin 5s infinite alternate;
}

@keyframes glow-spin {
	from {
		transform: rotate(0deg);
		filter: drop-shadow(0 0 5px #1ca223);
	}
	to {
		transform: rotate(10deg);
		filter: drop-shadow(0 0 15px #1ca223);
	}
}

/* CTA Button */
.cta-button {
	background: linear-gradient(135deg, #1ca223, #3B8D32);
	color: #fff;
	border-radius: 30px;
	padding: 12px 32px;
	text-transform: uppercase;
	transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.cta-button:hover {
	transform: scale(1.05);
	box-shadow: 0 6px 25px rgba(0, 255, 0, 0.6);
}

.feature-card {
	background: rgba(0, 0, 0, 0.8);
	color: #fff;
	border-radius: 12px;
	text-align: center;
	border: 2px solid rgba(76, 175, 80, 0.7);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
	transform: scale(1.05);
	box-shadow: 0 6px 25px rgba(0, 255, 0, 0.6);
	border: 2px solid #1ca223;
}

</style>
