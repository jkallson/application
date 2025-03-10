import {Message, MessageSolveResponse} from "../interfaces/Message";
import axios, {AxiosResponse} from "axios";

export class MessageRepository {
    static async getMessages(gameId: string): Promise<Message[]> {
        const response: AxiosResponse<Message[]> = await axios.get(`${process.env.API_BASE_URL}/${gameId}/messages`)
        return response.data
    }

    static async solveMessage(gameId: string, adId: string): Promise<MessageSolveResponse> {
        const response: AxiosResponse<MessageSolveResponse> = await axios.post(`${process.env.API_BASE_URL}/${gameId}/solve/${adId}`)
        return response.data
    }
}
