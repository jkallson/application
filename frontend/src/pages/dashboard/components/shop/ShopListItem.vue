<template>
    <v-list-item
        :title="`${item.name}`"
        :subtitle="`${item.cost} coins`"
    >
        <template v-slot:append>
            <v-btn
                class="buy-btn"
                :disabled="item.cost > gameStore.gameDomain.state.gold"
                size="small"
                :loading="loading"
                @click="buyShopItem"
            >
                Buy
            </v-btn>
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue';
import type { ShopItem } from '@/types/Shop';
import { useGameStore } from '@/stores/GameStore';
const gameStore = useGameStore()
const loading = ref<boolean>(false)

const props = defineProps({
    item: {
        type: Object as PropType<ShopItem>,
        required: true
    }
})

async function buyShopItem() {
    loading.value = true
    await gameStore.gameDomain.buyShopItem(props.item)
    loading.value = false
}
</script>


<style scoped>
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
	}

	.buy-btn:disabled {
		background-color: black;
		border: none;
	}

</style>
