import {ShopItem, ShopItemPurchaseResponse} from "../interfaces/ShopItem";
import {ShopRepository} from "../repositories/ShopRepository";

export const ShopService = {
    async getShopItems(gameId: string): Promise<ShopItem[]> {
        return await ShopRepository.getShopItems(gameId)
    },

    async purchaseItem(gameId: string, itemId: string): Promise<ShopItemPurchaseResponse> {
        return await ShopRepository.purchaseShopItem(gameId, itemId)
    }
}
