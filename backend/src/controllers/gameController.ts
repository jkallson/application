import {Request, Response} from 'express';

import {GameService} from "../services/gameService";
import {Game} from "../interfaces/Game";
import {Reputation} from "../interfaces/Reputation";

export const GameController = {
    async startGame(_req: Request, res: Response): Promise<void> {
        try {
            const game: Game = await GameService.startNewGame();
            res.status(200).json(game);
        } catch (error) {
            console.log(`[ERROR] - startGame failed ${error}`)
            res.status(500).json({error: 'Failed to start the game.'});
        }
    },

    async getReputation(req: Request, res: Response): Promise<void> {
        const {gameId} = req.params;

        try {
            const reputation: Reputation = await GameService.getReputation(gameId);
            res.status(200).json(reputation);
        } catch (error) {
            console.log(`[ERROR] - getReputation failed ${error}`)
            res.status(500).json({error: 'Failed to fetch reputation.'});
        }
    }
}
