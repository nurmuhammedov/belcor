import {compressCommands, decompressCommands, getRandomPosition} from 'utilities/common'
import {ICommand, IPosition} from 'interfaces/home.interface'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button, Card, Form, Input} from 'components'
import {showMessage} from 'utilities/alert'
import {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import {useForm} from 'react-hook-form'
import {FIELD} from 'constants/fields'
import classNames from 'classnames'
import {schema} from 'helpers/yup'
import {useActions} from 'hooks'
import {useRef} from 'react'


export const gridSizeX = 20
export const gridSizeY = 9
export const sampleCount = 5


const Index = () => {
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
	const [commands, setCommands] = useState<ICommand[]>([])
	const [time, setTime] = useState(500)
	const {addHistoryEntry} = useActions()
	const [activeCell, setActiveCell] = useState<number | null>(null)
	const [position, setPosition] = useState(JSON.parse(sessionStorage.getItem('position') as string) ?? {x: 0, y: 0})
	const [samples, setSamples] = useState(() => {
		const positions: IPosition[] = []
		for (let i = 0; i < sampleCount; i++) {
			positions.push(getRandomPosition(positions))
		}
		return JSON.parse(sessionStorage.getItem('samples') as string) ?? positions
	})

	const {
		handleSubmit,
		register,
		reset,
		formState: {errors}
	} = useForm({
		mode: 'onTouched',
		defaultValues: {commands: ''},
		resolver: yupResolver(schema)
	})


	useEffect(() => {
		if (!commands.length) return

		let index = 0
		let isCarrying = false
		let foundSample: number | undefined = undefined
		let initialPosition: number | undefined = undefined

		const handleStop = () => {
			setTimeout(() => {
				setActiveCell(null)
				setCommands([])
				isCarrying = false
				foundSample = undefined
				initialPosition = undefined
			}, 0)
		}

		if (intervalRef.current) {
			clearInterval(intervalRef.current)
			intervalRef.current = null
		}

		intervalRef.current = setInterval(() => {
			if (index >= commands.length) {
				clearInterval(intervalRef.current!)
				intervalRef.current = null
				handleStop()
				return
			}

			const cmd = commands[index]
			index++

			setPosition((prev: IPosition) => {
				let newX = prev.x
				let newY = prev.y

				if (cmd.command === 'Л' && newX > 0) newX -= cmd.step
				else if (cmd.command === 'П' && newX < gridSizeX - 1) newX += cmd.step
				else if (cmd.command === 'В' && newY > 0) newY -= cmd.step
				else if (cmd.command === 'Н' && newY < gridSizeY - 1) newY += cmd.step
				else if (cmd.command === 'О') {
					foundSample = samples.find((s: IPosition) => s.x === newX && s.y === newY)?.id
					if (foundSample) {
						showMessage('Sample found!', 'success', 5000, 'top-center')
						initialPosition = newX + (newY * gridSizeX) + 1
						isCarrying = true
					} else {
						showMessage('Sample not found!', 'error', 5000, 'top-center')
						clearInterval(intervalRef.current!)
						intervalRef.current = null
						handleStop()
					}
				} else if (cmd.command === 'Б') {
					if (isCarrying) {
						handleSamples(foundSample, newX, newY)
						addHistoryEntry({
							originalCommand: decompressCommands(commands),
							optimizedCommand: commands.map(c => `${c.step == 1 ? '' : c.step}${c.command}`).join(''),
							dateTime: new Date().toLocaleString('ru-RU', {
								day: '2-digit',
								month: '2-digit',
								year: 'numeric',
								hour: '2-digit',
								minute: '2-digit',
								second: '2-digit'
							}),
							samplesBefore: initialPosition ?? 1,
							samplesAfter: newX + (newY * gridSizeX) + 1
						})
						showMessage('Sample successfully moved', 'success', 5000, 'top-center')
						clearInterval(intervalRef.current!)
						intervalRef.current = null
						isCarrying = false
						handleStop()
					} else {
						showMessage('Sample was not selected', 'error', 5000, 'top-center')
						clearInterval(intervalRef.current!)
						intervalRef.current = null
						handleStop()
					}
				} else {
					showMessage('Invalid command', 'error', 5000, 'top-center')
					clearInterval(intervalRef.current!)
					intervalRef.current = null
					handleStop()
					sessionStorage.setItem('position', JSON.stringify(prev))
					return prev
				}

				if (isCarrying) {
					handleSamples(foundSample, newX, newY)
				}

				setActiveCell(newX + newY * gridSizeX)
				sessionStorage.setItem('position', JSON.stringify({x: newX, y: newY}))
				return {x: newX, y: newY}
			})
		}, time)

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current)
				intervalRef.current = null
			}
		}
	}, [commands, time])

	function handleSamples(foundSample: number | undefined, newX: number, newY: number) {
		setSamples((prevState: IPosition[]) => {
			if (foundSample) {
				const newSamples = prevState.filter((s) => s.id !== foundSample)
				sessionStorage.setItem('samples', JSON.stringify([...newSamples, {
					id: foundSample,
					x: newX,
					y: newY
				}]))
				return [...newSamples, {id: foundSample, x: newX, y: newY}]
			}
			sessionStorage.setItem('samples', JSON.stringify(prevState))
			return prevState
		})
	}

	const onSubmit = (data: { commands: string }) => {
		setCommands(compressCommands(data.commands))
		reset({commands: ''})
	}

	return (
		<>
			<Form
				style={{
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'space-between',
					marginBottom: '1rem'
				}}
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex align-center justify-center gap-lg">
					<Input
						style={{minWidth: 500}}
						id="commands"
						type={FIELD.TEXT}
						placeholder="Enter command and press ENTER key"
						error={errors?.commands?.message}
						{...register('commands')}
					/>
					<Input id="time" label="Time 10-990ms (for per step)">
						<input
							type="range"
							id="time"
							name="time"
							value={time}
							min={10}
							max={990}
							onChange={(e) => {
								setTime(Number(e.target.value))
							}}
						/>
					</Input>
				</div>
				<Button
					type={FIELD.BUTTON}
					onClick={() => {
						setSamples(() => {
							const positions: IPosition[] = []
							for (let i = 0; i < sampleCount; i++) {
								positions.push(getRandomPosition(positions))
							}
							return positions
						})
						setPosition({x: 0, y: 0})
						sessionStorage.removeItem('position')
						sessionStorage.removeItem('samples')
					}}
				>
					Reset
				</Button>
			</Form>
			<Card>
				<div className={styles.root}>
					{[...Array(gridSizeX * gridSizeY)].map((_, i) => (
						<div
							className={classNames(styles.child, {[styles['active-blink']]: activeCell === i})}
							key={i}
						>
							{
								position.x + position.y * gridSizeX === i &&
								<div className={styles['active-child']}></div>
							}
							<span>{i + 1}</span>
							{
								samples.some((s: IPosition) => s.x + s.y * gridSizeX === i) &&
								<div className={styles['sample']}>
									{samples.find((s: IPosition) => s.x + s.y * gridSizeX === i)?.id ?? null}
								</div>
							}
						</div>
					))}
				</div>
			</Card>
		</>
	)
}

export default Index
