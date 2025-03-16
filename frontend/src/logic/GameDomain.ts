import type { Game, Reputation } from '@/types/Game';
import type { Message } from '@/types/Message';
import type { ShopItem } from '@/types/Shop';

export class GameDomain {
    public state: Game
    public reputation: Reputation
    public messages: Message[] = []
    public shopItems: ShopItem = []

    constructor(state: Game, reputation: Reputation) {
        this.state = state
        this.reputation = reputation
    }

    public async fetchMessages (): void {

    }

    public async solveMessage (): void {

    }

    public async fetchShopItems (): void {

    }

    public async buyShopItem (): void {

    }
}
