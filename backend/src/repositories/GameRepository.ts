import {Game} from "../interfaces/Game";
import {Reputation} from "../interfaces/Reputation";
import axios, {AxiosResponse} from "axios";

export class GameRepository {
    static async startGame(): Promise<Game> {
        const response: AxiosResponse<Game> = await axios.post(`${process.env.API_BASE_URL}/start`)
        return response.data
    }

    static async fetchReputation(gameId: string): Promise<Reputation> {
        const response: AxiosResponse<Reputation> = await axios.post(`${process.env.API_BASE_URL}/${gameId}/investigate/reputation`)
        return response.data
    }
}
