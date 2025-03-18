import {Game} from "../interfaces/Game";
import {Reputation} from "../interfaces/Reputation";
import axios, {AxiosResponse} from "axios";
import {appConfiguration} from "../config/AppConfiguration";

export class GameRepository {
    static async startGame(): Promise<Game> {
        const response: AxiosResponse<Game> = await axios.post(`${appConfiguration.apiUrl}/game/start`)
        return response.data
    }

    static async fetchReputation(gameId: string): Promise<Reputation> {
        const response: AxiosResponse<Reputation> = await axios.post(`${appConfiguration.apiUrl}/${gameId}/investigate/reputation`)
        return response.data
    }
}
