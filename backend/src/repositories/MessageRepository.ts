import {Message, MessageSolveResponse} from "../interfaces/Message";
import axios, {AxiosResponse} from "axios";
import {appConfiguration} from "../config/AppConfiguration";

export class MessageRepository {
    static async getMessages(gameId: string): Promise<Message[]> {
        const response: AxiosResponse<Message[]> = await axios.get(`${appConfiguration.apiUrl}/${gameId}/messages`)
        return response.data
    }

    static async solveMessage(gameId: string, adId: string): Promise<MessageSolveResponse> {
        const response: AxiosResponse<MessageSolveResponse> = await axios.post(`${appConfiguration.apiUrl}/${gameId}/solve/${adId}`)
        return response.data
    }
}
