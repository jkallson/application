import type { ShopItem, ShopItemPurchase } from '@/types/Shop';
import axios, { type AxiosResponse } from 'axios';
import { config } from '@/config/AppConfig';

export class ShopRepository {
    static async getShopItems(gameId: string): Promise<ShopItem[]> {
        const response: AxiosResponse<ShopItem[]> = await axios.get(`${config.apiUrl}/api/game/${gameId}/shop`)
        return response.data
    }

    static async purchaseShopItem(gameId: string, itemId: string ): Promise<ShopItemPurchase> {
        const response: AxiosResponse<ShopItemPurchaseResponse> = await axios.post(`${config.apiUrl}/api/game/${gameId}/shop/${itemId}/purchase`)
        return response.data
    }
}
