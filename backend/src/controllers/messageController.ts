import { Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import {Message, MessageSolveResponse} from "../interfaces/Message";

export const MessageController = {
    async getMessages(req: Request, res: Response) {
        const { gameId } = req.params;
        try {
            const messages: Message[] = await MessageService.getMessages(gameId);
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve messages.' });
        }
    },

    async solveMessage(req: Request, res: Response) {
        const { gameId, messageId } = req.params;
        try {
            const result: MessageSolveResponse = await MessageService.solveMessage(gameId, messageId);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ error: `Failed to solve the message. ${error}` });
        }
    }
};
