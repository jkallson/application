import {Game} from "../interfaces/Game";
import {Message, MessageSolveResponse} from "../interfaces/Message";
import {MessageRepository} from "../repositories/MessageRepository";
import {ShopRepository} from "../repositories/ShopRepository";
import {ShopItem, ShopItemPurchaseResponse} from "../interfaces/ShopItem";

export const LOW_RISK_MESSAGES: string[] = ['Piece of cake', 'Walk in the park']
export const MEDIUM_RISK_MESSAGES: string[] = ['Hmmm....', 'Sure thing', 'Quite likely', 'Gamble']
export const HIGH_RISK_MESSAGES: string[] = ['Rather detrimental', 'Playing with fire', 'Risky']
export const LAST_RESORT_MESSAGES: string[] = ['Suicide mission', 'Impossible']

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AutomatedGame {
    public gameState: Game
    private messages: Message[] = []
    private turnWhenMessagesFetched: number = 0
    private purchasedUpgrades: Map<string, number> = new Map([
        ['cs', 0],
        ['gas', 0],
        ['wax', 0],
        ['tricks', 0],
        ['wingpot', 0],
        ['ch', 0],
        ['rf', 0],
        ['iron', 0],
        ['mtrix', 0],
        ['wingpotmax', 0]
    ]);

    constructor(gameState: Game) {
        this.gameState = gameState;
    }

    public async play (): Promise<void> {
        while (this.gameState.lives > 0) {
            await this.fetchMessages()

            if (this.processedMessages().length === 0) {
                console.log(`[ERROR] - No messages found. ${this.processedMessages()}`)
                break
            }

            while (this.processedMessages().length > 0) {
                if (this.gameState.lives <= 0) {
                    break
                }

                if (this.onlyHighRiskMessagesRemaining()) {
                    await this.purchaseUpgrades();
                    console.log('[WARN] - Fetching messages again since only high risk messages are remaining')
                    break
                }

                const message: Message = this.processedMessages()[0];
                if (!message) {
                    break
                }

                if (message.expiresIn <= 0) {
                    console.log(`[INFO] - Message expired before attempt: "${message.message}"`);
                    continue;
                }

                await this.attemptMessage(message)
                await delay(500)
            }
        }
    }

    private async fetchMessages(): Promise<void> {
        try {
            this.messages = await MessageRepository.getMessages(this.gameState.gameId);
            this.turnWhenMessagesFetched = this.gameState.turn
        } catch (error) {
            console.error(`[ERROR] Failed fetching messages: ${error}`);
        }
    }

    private async attemptMessage(message: Message): Promise<void> {
        try {
            const result: MessageSolveResponse = await MessageRepository.solveMessage(this.gameState.gameId, message.adId);

            if (!result.success) {
                console.log(`[MESSAGE FAIL] - Probability: ${message.probability}. Current score ${result.score}`)
                this.gameState.lives = result.lives;
            } else {
                console.log(`[MESSAGE SUCCESS] - Probability: ${message.probability}. Current score ${result.score}`)
                this.gameState.gold = result.gold;
                this.gameState.score = result.score;
            }

            this.gameState.turn = result.turn;

            if (this.gameState.lives <= 0) {
                console.log(`[INFO] - Game Over! Final Score: ${this.gameState.score}`);
                return
            }

            await this.purchaseUpgrades()
            await this.fetchMessages()
        } catch (error) {
            console.error(`[ERROR] - Error solving message "${message.message}": ${error}`);
        }
    }

    async purchaseUpgrades(): Promise<void> {
        if (this.gameState.lives <= 0) {
            return
        }

        const availableUpgrades: ShopItem[] = (await ShopRepository
            .getShopItems(this.gameState.gameId))
            .filter(item => this.purchasedUpgrades.has(item.id))

        if (availableUpgrades.length === 0) {
            console.log(`[INFO] - No available upgrades found.`);
            return;
        }

        const selectedUpgrade: ShopItem = availableUpgrades.sort((a, b) => {
            const purchasesA: number = this.purchasedUpgrades.get(a.id) || 0;
            const purchasesB: number = this.purchasedUpgrades.get(b.id) || 0;
            return purchasesA - purchasesB;
        })[0];

        if (this.gameState.gold - 100 > selectedUpgrade.cost) {
            const result = await ShopRepository.purchaseShopItem(this.gameState.gameId, selectedUpgrade.id);

            if (result.shoppingSuccess) {
                console.log(`[INFO] - Purchased upgrade: ${selectedUpgrade.name}. Remaining Gold: ${result.gold}`);
                this.purchasedUpgrades.set(selectedUpgrade.id, (this.purchasedUpgrades.get(selectedUpgrade.id) || 0) + 1);
                this.gameState.gold = result.gold;
                this.gameState.turn = result.turn;
            }
        }

        await this.purchaseHealingPotion()
    }

    async purchaseHealingPotion(): Promise<void> {
        if (this.gameState.lives <= 0) {
            return
        }

        const shopItems: ShopItem[] = await ShopRepository.getShopItems(this.gameState.gameId);

        const healingPotion: ShopItem | undefined = shopItems.find(item => item.name === 'Healing potion');
        if (this.gameState.lives <= 2 && this.gameState.gold >= 50 && healingPotion) {
            const shoppingResult: ShopItemPurchaseResponse = await ShopRepository.purchaseShopItem(this.gameState.gameId, healingPotion.id);

            if (shoppingResult.shoppingSuccess) {
                this.gameState.lives = shoppingResult.lives;
                this.gameState.gold = shoppingResult.gold;
                this.gameState.turn = shoppingResult.turn;
                console.log(`[HEAL] - Bought Healing Potion! Lives: ${this.gameState.lives}`);
            } else {
                console.log(`[HEAL] - Failed to buy Healing Potion. Gold: ${this.gameState.gold}`);
            }
        }
    }

    public processedMessages(): Message[] {
        const availableMessages = this.messages.filter(message => message.encrypted === null);

        const categorizedMessages = {
            lowRisk: availableMessages.filter(message => LOW_RISK_MESSAGES.includes(message.probability)),
            mediumRisk: availableMessages.filter(message => MEDIUM_RISK_MESSAGES.includes(message.probability)),
            highRisk: availableMessages.filter(message => HIGH_RISK_MESSAGES.includes(message.probability)),
            lastResort: availableMessages.filter(message => LAST_RESORT_MESSAGES.includes(message.probability)),
        };

        if (this.gameState.turn < 30 && categorizedMessages.lowRisk.length) {
            return [...categorizedMessages.lowRisk].sort((a, b) => b.reward - a.reward);
        }

        if (categorizedMessages.lowRisk.length || categorizedMessages.mediumRisk.length) {
            return [...categorizedMessages.lowRisk, ...categorizedMessages.mediumRisk]
                .sort((a, b) => b.reward - a.reward);
        }

        if (categorizedMessages.highRisk.length) {
            return [...categorizedMessages.lowRisk, ...categorizedMessages.mediumRisk, ...categorizedMessages.highRisk]
                .sort((a, b) => b.reward - a.reward);
        }

        return [...categorizedMessages.lastResort].sort((a, b) => b.reward - a.reward);
    }

    private onlyHighRiskMessagesRemaining(): boolean {
        return this.gameState.turn !== this.turnWhenMessagesFetched &&
            this.processedMessages().every(msg => LAST_RESORT_MESSAGES.includes(msg.probability));
    }
}
