import 'dotenv/config';
import {AutomatedGame} from "./AutomatedGame";
import {GameRepository} from "../repositories/GameRepository";

async function main(): Promise<void> {
    try {
        const gameState = await GameRepository.startGame();

        const automatedGame = new AutomatedGame(gameState);
        await automatedGame.play();
    } catch (error) {
        console.error(`[ERROR] Failed to start game: ${error}`);
    }
}

main()
