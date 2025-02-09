interface IPosition {
	x: number
	y: number
	id: number
}

interface ICommand {
	step: number
	command: string
}

export type {
	IPosition,
	ICommand
}