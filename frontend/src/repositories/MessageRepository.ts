import { Message, MessageSolve } from '@/types/Message';
import axios, { AxiosResponse } from 'axios';

export class MessageRepository {
    static async getMessages(gameId: string): Promise<Message[]> {
        const response: AxiosResponse<Message[]> = await axios.get(`${process.env.API_BASE_URL}/api/game/${gameId}/messages`)
        return response.data
    }

    static async solveMessage(gameId: string, adId: string): Promise<MessageSolve> {
        const response: AxiosResponse<MessageSolveResponse> = await axios.post(`${process.env.API_BASE_URL}/api/game/${gameId}/solve/${adId}`)
        return response.data
    }
}

