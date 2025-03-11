import {GameRepository} from "../repositories/GameRepository";
import {Game} from "../interfaces/Game";
import {Reputation} from "../interfaces/Reputation";

export const GameService = {
    async startNewGame(): Promise<Game> {
        const gameState: Game = await GameRepository.startGame();

        if (!gameState) {
            throw new Error('Failed to start the game. Please try again.');
        }

        console.log(`[INFO] - New game started. Game ID: ${gameState.gameId}`);
        return gameState;
    },

    async getReputation(gameId: string): Promise<Reputation> {
        return await GameRepository.fetchReputation(gameId)
    }
}
