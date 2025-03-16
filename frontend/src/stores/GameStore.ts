import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Game, Reputation } from '@/types/Game';
import { GameDomain } from '@/logic/GameDomain';

export const useGameStore = defineStore('game', () => {
    const gameDomain = ref<GameDomain | null>(null);

    function initializeGame(state: Game, reputation: Reputation) {
        gameDomain.value = new GameDomain(state, reputation);
    }

    return {
        gameDomain,
        initializeGame
    };
});
