import {GameRepository} from "../repositories/GameRepository";
import {Game} from "../interfaces/Game";
import {
    Message,
    MessageSolveResponse
} from "../interfaces/Message";
import {MessageRepository} from "../repositories/MessageRepository";
import {ShopRepository} from "../repositories/ShopRepository";
import {ShopItem} from "../interfaces/ShopItem";

export const LOW_RISK_MESSAGES: string[] = ['Piece of cake', 'Walk in the park']
export const MEDIUM_RISK_MESSAGES: string[] = ['Hmmm....', 'Sure thing', 'Quite likely', 'Gamble']
export const HIGH_RISK_MESSAGES: string[] = ['Rather detrimental', 'Playing with fire', 'Risky']
export const LAST_RESORT_MESSAGES: string[] = ['Suicide mission', 'Impossible']

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function playFullGame() {
    try {
        const gameState: Game = await GameRepository.startGame();
        console.log(`Started new game: ${gameState.gameId}`);
        const automatedGame: AutomatedGame = new AutomatedGame(gameState)

        await automatedGame.play()

        console.log(`Final Score: ${gameState.score}`);
    } catch (error) {
        console.error('Error during game execution:', error);
    }
}

class AutomatedGame {
    public gameState: Game
    private messages: Message[] = []
    private purchasedUpgrades: Map<string, number> = new Map()
    private turnWhenMessagesFetched: number = 0

    constructor(gameState: Game) {
        this.gameState = gameState;

            [
            'cs', 'gas', 'wax', 'tricks', 'wingpot',
                'ch', 'rf', 'iron', 'mtrix', 'wingpotmax'
            ].forEach(id => this.purchasedUpgrades.set(id, 0));
    }

    public async play (): Promise<void> {
        while (this.gameState.lives > 0) {
            console.log(`[INFO] - Current status: Lives(${this.gameState.lives}) | Gold(${this.gameState.gold}) | Score(${this.gameState.score})`);

            try {
                const messages: Message[] = await MessageRepository.getMessages(this.gameState.gameId);
                this.setMessages(messages)
                this.turnWhenMessagesFetched = this.gameState.turn
            } catch (error) {
                console.error(`[ERROR] - Failed fetching messages: ${error}`);
                continue;
            }

            if (this.getMessages().length === 0) {
                console.log(`[ERROR] - No messages found. ${this.getMessages()}`)
                break
            }

            while (this.getMessages().length > 0) {
                if (this.gameState.lives <= 0) {
                    break
                }

                if (this.gameState.turn !== this.turnWhenMessagesFetched && this.getMessages().every(it => LAST_RESORT_MESSAGES.includes(it.probability))) {
                    await this.purchaseUpgrades();
                    console.log('[WARN] - Fetching messages again since only high risk messages are remaining')
                    break
                }

                const message = this.getMessages()[0];
                if (!message) {
                    break
                }

                if (message.expiresIn <= 0) {
                    console.log(`[INFO] - Message expired before attempt: "${message.message}"`);
                    continue;
                }

                await this.attemptMessage(message)
                await delay(250)
            }
        }
    }

    private async attemptMessage(message: Message): Promise<void> {
        try {
            const result: MessageSolveResponse = await MessageRepository.solveMessage(this.gameState.gameId, message.adId);
            this.messages = this.messages.filter(it => it.adId !== message.adId)

            if (!result.success) {
                console.log(`[MESSAGE FAIL] - Probability: ${message.probability}`)
                this.gameState.lives = result.lives;
            } else {
                console.log(`[MESSAGE SUCCESS] - Probability: ${message.probability}`)
                this.gameState.gold = result.gold;
                this.gameState.score = result.score;
            }

            this.gameState.turn = result.turn;
            this.handleMessagesAfterTurn()

            await this.purchaseUpgrades();

            if (this.gameState.lives <= 0) {
                console.log(`[INFO] - Game Over! Final Score: ${this.gameState.score}`);
            }
        } catch (error) {
            console.error(`[ERROR] - Error solving message "${message.message}": ${error}`);
        }
    }

    async purchaseUpgrades(): Promise<void> {
        if (this.gameState.lives <= 0) {
            return
        }

        const shopItems: ShopItem[] = await ShopRepository.getShopItems(this.gameState.gameId);

        const availableUpgrades = shopItems.filter(item => this.purchasedUpgrades.has(item.id));

        if (availableUpgrades.length === 0) {
            console.log(`[INFO] - No available upgrades found.`);
            return;
        }

        // Sort upgrades by the number of purchases (ascending order)
        const sortedUpgrades = availableUpgrades.sort((a, b) => {
            const purchasesA = this.purchasedUpgrades.get(a.id) || 0;
            const purchasesB = this.purchasedUpgrades.get(b.id) || 0;
            return purchasesA - purchasesB;
        });

        const upgrade = sortedUpgrades[0]

        if (this.gameState.gold - 100 > upgrade.cost) {
            const result = await ShopRepository.purchaseShopItem(this.gameState.gameId, upgrade.id);

            if (result.shoppingSuccess) {
                this.handleMessagesAfterTurn()
                console.log(`[INFO] - Purchased upgrade: ${upgrade.name}. Remaining Gold: ${result.gold}`);
                this.purchasedUpgrades.set(upgrade.id, (this.purchasedUpgrades.get(upgrade.id) || 0) + 1);
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

        const healingPotion = shopItems.find(item => item.name === 'Healing potion');
        if (this.gameState.lives <= 4 && this.gameState.gold >= 50 && healingPotion) {
            const shoppingResult = await ShopRepository.purchaseShopItem(this.gameState.gameId, healingPotion.id);

            if (shoppingResult.shoppingSuccess) {
                this.handleMessagesAfterTurn();

                this.gameState.lives = shoppingResult.lives;
                this.gameState.gold = shoppingResult.gold;
                this.gameState.turn = shoppingResult.turn;
                console.log(`[HEAL] - Bought Healing Potion! Lives: ${this.gameState.lives}`);
            } else {
                console.log(`[HEAL] - Failed to buy Healing Potion. Gold: ${this.gameState.gold}`);
            }
        }
    }

    public getMessages(): Message[] {
        const availableMessages: Message[] = this.messages.filter(message => message.encrypted === null);

        const lowRiskMessages: Message[] = availableMessages.filter(message => LOW_RISK_MESSAGES.includes(message.probability));
        const mediumRiskMessages: Message[] = availableMessages.filter(message => MEDIUM_RISK_MESSAGES.includes(message.probability));
        const highRiskMessages: Message[] = availableMessages.filter(message => HIGH_RISK_MESSAGES.includes(message.probability));
        const lastResortMessages: Message[] = availableMessages.filter(message => LAST_RESORT_MESSAGES.includes(message.probability));
        const unknownMessages: Message[] = availableMessages.filter(message =>
            !LOW_RISK_MESSAGES.includes(message.probability) &&
            !MEDIUM_RISK_MESSAGES.includes(message.probability) &&
            !HIGH_RISK_MESSAGES.includes(message.probability) &&
            !LAST_RESORT_MESSAGES.includes(message.probability)
        );

        if (unknownMessages.length > 0) {
            console.log(`[UNKNOWN MESSAGES] - ${unknownMessages.map(it => it.probability).join(', ')}`)
        }

        if (this.gameState.turn < 30 && lowRiskMessages.length > 0) {
            return lowRiskMessages.sort((a, b) => b.reward - a.reward)
        } else if (lowRiskMessages.length !== 0 || mediumRiskMessages.length !== 0) {
            return [...lowRiskMessages, ...mediumRiskMessages].sort((a, b) => b.reward - a.reward)
        } else if (highRiskMessages.length !== 0){
            return [...lowRiskMessages, ...mediumRiskMessages, ...highRiskMessages].sort((a, b) => b.reward - a.reward)
        } else {
            return lastResortMessages.sort((a, b) => b.reward - a.reward)
        }
    }

    public setMessages (messages: Message[]): void {
        this.messages = messages
    }

    public handleMessagesAfterTurn (): void {
        this.messages = this.messages.map(message => ({
            ...message,
            expiresIn: message.expiresIn - 1
        })).filter(it => it.expiresIn > 0)

        if (this.messages.length === 0) {
            console.log(`[MESSAGES] - no more valid messages`)
        }
    }
}
