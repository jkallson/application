import { Request, Response } from 'express';

import {GameService} from "../services/gameService";
import {Game} from "../interfaces/Game";

export const GameController = {
    async startGame(req: Request, res: Response) {
        try {
            const game: Game = await GameService.startNewGame();
            res.status(200).json(game);
        } catch (error) {
            res.status(500).json({ error: 'Failed to start the game.' });
        }
    },
}
