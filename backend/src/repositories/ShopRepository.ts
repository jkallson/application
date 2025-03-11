import {ShopItem, ShopItemPurchaseResponse} from "../interfaces/ShopItem";
import axios, {AxiosResponse} from "axios";

export class ShopRepository {
    static async getShopItems(gameId: string): Promise<ShopItem[]> {
        const response: AxiosResponse<ShopItem[]> = await axios.get(`${process.env.API_BASE_URL}/${gameId}/shop`)
        return response.data
    }

    static async purchaseShopItem(gameId: string, itemId: string ): Promise<ShopItemPurchaseResponse> {
        const response: AxiosResponse<ShopItemPurchaseResponse> = await axios.post(`${process.env.API_BASE_URL}/${gameId}/shop/buy/${itemId}`)
        return response.data
    }
}
