import type { Game, Reputation } from '@/types/Game';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import { config } from '@/config/AppConfig';

export class GameRepository {
    static async startGame(): Promise<Game> {
        const response: AxiosResponse<Game> = await axios.post(`${config.apiUrl}/api/game/start`)
        return response.data
    }

    static async fetchReputation(gameId: string): Promise<Reputation> {
        const response: AxiosResponse<Reputation> = await axios.post(`${config.apiUrl}/api/game/${gameId}/reputation`)
        return response.data
    }
}
