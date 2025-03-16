import { defineStore } from 'pinia';
import { ref } from 'vue';

import type { Game, Reputation } from '@/types/Game';
import { GameDomain } from '@/logic/GameDomain';

export const useGameStore = defineStore('game', () => {
    const gameDomain = ref<GameDomain | null>(null);

    function initializeGame(state: Game, reputation: Reputation) {
        gameDomain.value = new GameDomain(state, reputation);
    }

    async function fetchMessages() {
        if (!gameDomain.value) return;
        await gameDomain.value.fetchMessages();
    }

    async function solveMessage() {
        if (!gameDomain.value) return;
        await gameDomain.value.solveMessage();
    }

    async function fetchShopItems() {
        if (!gameDomain.value) return;
        await gameDomain.value.fetchShopItems();
    }

    async function buyShopItem() {
        if (!gameDomain.value) return;
        await gameDomain.value.buyShopItem();
    }

    return {
        gameDomain,
        initializeGame,
        fetchMessages,
        solveMessage,
        fetchShopItems,
        buyShopItem
    };
});
