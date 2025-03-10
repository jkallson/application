import {GameRepository} from "../repositories/GameRepository";
import {Game} from "../interfaces/Game";
import {Reputation} from "../interfaces/Reputation";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function playFullGame() {
    try {
        const gameState: Game = await GameRepository.startGame();
        console.log(`Started new game: ${gameState.gameId}`);

        const reputation: Reputation = await GameRepository.fetchReputation(gameState.gameId);
        console.log(`Reputation: People(${reputation.people}) | State(${reputation.state}) | Underworld(${reputation.underworld})`);

        await playGameLoop(gameState, reputation);

        console.log(`Final Score: ${gameState.score}`);
    } catch (error) {
        console.error('Error during game execution:', error);
    }
}

async function playGameLoop(gameState: Game, reputation: Reputation) {
    console.log(`Game state is ${gameState}`)
    console.log(`Reputation is ${reputation}`)
    return Promise.resolve()
}
