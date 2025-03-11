import { Request, Response } from 'express';

import {ShopService} from "../services/shopService";
import {ShopItem, ShopItemPurchaseResponse} from "../interfaces/ShopItem";

export const ShopController = {
    async getItems(req: Request, res: Response): Promise<void> {
        const { gameId } = req.params;
        try {
            const items: ShopItem[] = await ShopService.getShopItems(gameId)
            res.status(200).json(items);
        } catch (error) {
            console.log(`[ERROR] - getItems failed - ${error}`)
            res.status(500).json({ error: 'Failed to fetch shop items' });
        }
    },

    async purchaseItem(req: Request, res: Response): Promise<void> {
        const { gameId, itemId } = req.params;
        try {
            const result: ShopItemPurchaseResponse = await ShopService.purchaseItem(gameId, itemId);
            res.status(200).json(result);
        } catch (error) {
            console.log(`[ERROR] - purchaseItem failed - ${error}`)
            res.status(400).json({ error: 'Failed to purchase item' });
        }
    }
}
