<template>
    <v-list-item
        :title="title"
        :subtitle="`${item.cost} coins`"
    >
        <template v-slot:append>
            <v-btn
                class="buy-btn"
                color="primary"
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
import { computed, type PropType, ref } from 'vue';
import type { ShopItem } from '@/types/Shop';
import { useGameStore } from '@/stores/GameStore';
import { useNotification } from '@kyvg/vue3-notification';
const { notify } = useNotification()
const gameStore = useGameStore()
const loading = ref<boolean>(false)

const props = defineProps({
    item: {
        type: Object as PropType<ShopItem>,
        required: true
    }
})

const title: string = computed(() => {
    const existingItemInUpgrades = gameStore.gameDomain.boughtUpgrades[props.item.id]
    const amount: string = existingItemInUpgrades === undefined ? '' : `(${existingItemInUpgrades.amount} bought)`
    return `${props.item.name} ${amount}`
})

const buyShopItem = async (): Promise<void> => {
    loading.value = true
    await gameStore.gameDomain.buyShopItem(props.item)
    notify({
        title: 'Upgrade purchased',
        text: `${props.item.name} purchased! ${gameStore.gameDomain.state.gold} coins remaining`,
        type: 'success'
    })
    loading.value = false
}
</script>


<style scoped>
	.buy-btn:hover {
		transform: scale(1.05);
	}

	.buy-btn:disabled {
		background-color: black !important;
		border: none;
	}

</style>
