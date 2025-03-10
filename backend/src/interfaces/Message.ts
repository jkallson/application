export type MessageProbability = 'Hmmm....' | 'Sure thing' | 'Piece of cake' | 'Walk in the park' | 'Rather detrimental'

export interface Message {
    adId: string
    message: string
    reward: number
    expiresIn: number
    encrypted: string | null
    probability: MessageProbability
}
