import authReducer from 'store/auth/auth.slice'
import historyReducer from 'store/history/history.slice'


export const rootReducer = {
	auth: authReducer,
	history: historyReducer
}
