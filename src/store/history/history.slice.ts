import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IHistoryEntry} from 'interfaces/history.interface'


interface HistoryState {
	entries: IHistoryEntry[]
}

const initialState: HistoryState = {
	entries: JSON.parse(sessionStorage.getItem('history') as string) ?? []
}

export const historySlice = createSlice({
	name: 'history',
	initialState,
	reducers: {
		addHistoryEntry: (state, action: PayloadAction<Omit<IHistoryEntry, 'id'>>) => {
			sessionStorage.setItem('history', JSON.stringify([{id: state.entries.length + 1, ...action.payload}, ...state.entries]))
			state.entries.unshift({id: state.entries.length + 1, ...action.payload})
		},
		clearHistory: (state) => {
			state.entries = []
		}
	}
})

export const {
	addHistoryEntry,
	clearHistory
} = historySlice.actions

export default historySlice.reducer
