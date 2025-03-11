export interface Message {
    adId: string
    message: string
    reward: number
    expiresIn: number
    encrypted: string | null
    probability: string
}

export interface MessageSolveResponse {
    success: boolean,
    lives: number
    gold: number
    score: number
    highScore: number
    turn: number
    message: string
}

