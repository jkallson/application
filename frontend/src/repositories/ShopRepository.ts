import { ShopItem, ShopItemPurchase } from '@/types/Shop';
import axios, { AxiosResponse } from 'axios';

export class ShopRepository {
    static async getShopItems(gameId: string): Promise<ShopItem[]> {
        const response: AxiosResponse<ShopItem[]> = await axios.get(`${process.env.API_BASE_URL}/api/game/${gameId}/shop`)
        return response.data
    }

    static async purchaseShopItem(gameId: string, itemId: string ): Promise<ShopItemPurchase> {
        const response: AxiosResponse<ShopItemPurchaseResponse> = await axios.post(`${process.env.API_BASE_URL}/api/game/${gameId}/shop/${itemId}/purchase`)
        return response.data
    }
}
