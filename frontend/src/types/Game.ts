export interface Game {
	gameId: string
	lives: number
	gold: number
	level: number
	score: number
	highScore: number
	turn: number
}

export interface Reputation {
	people: number
	state: number
	underworld: number
}
