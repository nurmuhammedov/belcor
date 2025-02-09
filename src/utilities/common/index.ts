import {ISearchParams} from 'interfaces/params.interface'
import {ISelectOption} from 'interfaces/form.interface'
import {gridSizeX, gridSizeY} from 'screens/Home'
import {ICommand, IPosition} from 'interfaces/home.interface'


const noop = (): void => {}
const noopAsync = async (): Promise<undefined> => {}

const cleanParams = (params: ISearchParams) => {
	const filteredParams: ISearchParams = {}
	Object.keys(params).forEach(key => {
		const value = params[key]
		if (value !== null && value !== undefined && value !== '') {
			filteredParams[key] = value
		}
	})
	return filteredParams
}

function isObject(val: unknown): val is ISearchParams {
	return typeof val === 'object' && val !== null
}

function getSelectValue(options: ISelectOption[], value: string | number | boolean | (string | number | boolean)[] | undefined | null): ISelectOption[] | null | ISelectOption {
	if (Array.isArray(value)) {
		return options.filter((item) => value.includes(item.value))
	}
	return options.find((item) => item?.value == value) ?? null
}


const getRandomPosition = (existingPositions: IPosition[]) => {
	let newPosition: IPosition | null = null
	do {
		newPosition = {
			id: existingPositions.length + 1,
			x: Math.floor(Math.random() * gridSizeX),
			y: Math.floor(Math.random() * gridSizeY)
		}
	} while (existingPositions.some((pos) => pos.x === newPosition?.x && pos.y === newPosition?.y))

	return newPosition
}

function compressCommands(input: string): ICommand[] {
	if (!input) return []

	const result: ICommand[] = []
	let count = 1

	for (let i = 1; i <= input.length; i++) {
		if (input[i] === input[i - 1]) {
			count++
		} else {
			result.push({step: count, command: input[i - 1]})
			count = 1
		}
	}

	return result
}

function decompressCommands(commands: ICommand[]): string {
	return commands.map(cmd => cmd.command.repeat(cmd.step)).join('')
}


export {
	noop,
	isObject,
	noopAsync,
	cleanParams,
	getSelectValue,
	compressCommands,
	getRandomPosition,
	decompressCommands
}