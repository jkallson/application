import type { Game, Reputation } from '@/types/Game';
import type { Message, MessageSolve } from '@/types/Message';
import type { ShopItem, ShopItemPurchase } from '@/types/Shop';
import { MessageRepository } from '@/repositories/MessageRepository';
import { ShopRepository } from '@/repositories/ShopRepository';

export class GameDomain {
    public state: Game
    public reputation: Reputation
    public messages: Message[] = []
    public shopItems: ShopItem = []
    public boughtUpgrades: Record<string, { name: string, amount: number }> = {}

    constructor(state: Game, reputation: Reputation) {
        this.state = state
        this.reputation = reputation
    }

    public async fetchMessages (): Promise<void> {
        this.messages = await MessageRepository.getMessages(this.state.gameId)
    }

    public async solveMessage (messageId: string): Promise<MessageSolve> {
        const response: MessageSolve = await MessageRepository.solveMessage(this.state.gameId, messageId)

        if (response.success) {
            this.state.gold = response.gold
            this.state.score = response.score
        } else {
            this.state.lives = response.lives
        }

        this.state.turn = response.turn

        return response
    }

    public async fetchShopItems (): Promise<void> {
        this.shopItems = await ShopRepository.getShopItems(this.state.gameId)
    }

    public async buyShopItem (item: ShopItem): void {
        if (item.cost > this.state.gold) {
            return
        }

        const response: ShopItemPurchase = await ShopRepository.purchaseShopItem(this.state.gameId, item.id)
        console.log(response)

        if (response.shoppingSuccess) {
            this.state.gold = response.gold
            this.state.turn = response.turn
            this.state.lives = response.lives

            if (this.boughtUpgrades[item.id]) {
                this.boughtUpgrades[item.id].amount += 1
            } else {
                this.boughtUpgrades[item.id] = {
                    name: item.name,
                    amount: 1
                }
            }
        }
    }
}
