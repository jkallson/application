import { Game, Reputation } from '@/types/Game';
import axios, { AxiosResponse } from 'axios';

export class GameRepository {
    static async startGame(): Promise<Game> {
        const response: AxiosResponse<Game> = await axios.post(`${process.env.API_BASE_URL}/api/game/start`)
        return response.data
    }

    static async fetchReputation(gameId: string): Promise<Reputation> {
        const response: AxiosResponse<Reputation> = await axios.post(`${process.env.API_BASE_URL}/api/game/${gameId}/reputation`)
        return response.data
    }
}
