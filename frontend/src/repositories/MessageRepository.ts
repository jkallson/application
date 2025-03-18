import type { Message, MessageSolve } from '@/types/Message';
import axios, { type AxiosResponse } from 'axios';
import { config } from '@/config/AppConfig';

export class MessageRepository {
    static async getMessages(gameId: string): Promise<Message[]> {
        const response: AxiosResponse<Message[]> = await axios.get(`${config.apiUrl}/api/game/${gameId}/messages`)
        return response.data
    }

    static async solveMessage(gameId: string, adId: string): Promise<MessageSolve> {
        const response: AxiosResponse<MessageSolveResponse> = await axios.post(`${config.apiUrl}/api/game/${gameId}/solve/${adId}`)
        return response.data
    }
}

