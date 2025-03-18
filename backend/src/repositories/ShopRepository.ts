import {ShopItem, ShopItemPurchaseResponse} from "../interfaces/ShopItem";
import axios, {AxiosResponse} from "axios";
import {appConfiguration} from "../config/AppConfiguration";

export class ShopRepository {
    static async getShopItems(gameId: string): Promise<ShopItem[]> {
        const response: AxiosResponse<ShopItem[]> = await axios.get(`${appConfiguration.apiUrl}/${gameId}/shop`)
        return response.data
    }

    static async purchaseShopItem(gameId: string, itemId: string ): Promise<ShopItemPurchaseResponse> {
        const response: AxiosResponse<ShopItemPurchaseResponse> = await axios.post(`${appConfiguration.apiUrl}/${gameId}/shop/buy/${itemId}`)
        return response.data
    }
}
