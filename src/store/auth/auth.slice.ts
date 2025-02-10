import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from 'interfaces/authentication.interface'
import {login, logout} from 'store/auth/auth.action'


interface IAuth {
	user: IUser | null
	isLoading: boolean
}

const initialState: IAuth = {
	user: JSON.parse(localStorage.getItem('user') || 'null'),
	isLoading: false
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true
				state.user = null
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<IUser>) => {
				state.user = action.payload
				state.isLoading = false
			})
			.addCase(login.rejected, (state) => {
				state.user = null
				state.isLoading = false
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null
			})
	}
})

export default authSlice.reducer
