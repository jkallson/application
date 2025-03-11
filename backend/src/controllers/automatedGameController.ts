import { Request, Response } from 'express';
import { playFullGame } from '../services/automatedGameService';

export const startAutomatedGame = async (req: Request, res: Response) => {
    try {
        await playFullGame();
        res.status(200).send('Game started...');
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error running game logic.' });
    }
};
