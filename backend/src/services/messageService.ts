import {Message, MessageSolveResponse} from "../interfaces/Message";
import {MessageRepository} from "../repositories/MessageRepository";

export const MessageService = {
    async getMessages(gameId: string): Promise<Message[]> {
        return await MessageRepository.getMessages(gameId)
    },

    async solveMessage (gameId: string, messageId: string): Promise<MessageSolveResponse> {
        return await MessageRepository.solveMessage(gameId, messageId)
    }
}
