import {addHistoryEntry, clearHistory} from './history/history.slice'
import * as authActions from './auth/auth.action'


export const allActions = {
	...authActions,
	addHistoryEntry,
	clearHistory
}
