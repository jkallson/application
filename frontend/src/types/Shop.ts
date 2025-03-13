export interface ShopItem {
	id: string
	name: string
	cost: number
}

export interface ShopItemPurchase {
	shoppingSuccess: boolean
	gold: number
	lives: number
	level: number
	turn: number
}
