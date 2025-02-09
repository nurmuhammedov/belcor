import {IUser} from 'interfaces/authentication.interface'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {showMessage} from 'utilities/alert'
import {ROLE_LIST} from 'constants/roles'


export const login = createAsyncThunk<IUser, { username: string; password: string }>(
	'auth/login',
	async (credentials, {rejectWithValue}) => {
		return new Promise((resolve) => {
			if (credentials.username === 'admin' && credentials.password === 'admin') {
				const user: IUser = {fullName: 'Admin', role: ROLE_LIST.ADMIN}
				setTimeout(() => {
					localStorage.setItem('user', JSON.stringify(user))
					resolve(user)
					showMessage('Successful', 'success')
				}, 1000)
			} else {
				setTimeout(() => {
					showMessage('Invalid credentials', 'error')
					rejectWithValue(null)
				}, 1000)
			}
		})
	}
)

export const logout = createAsyncThunk(
	'auth/logout', async () => {
		localStorage.removeItem('user')
		showMessage('Successful', 'success')
		return null
	}
)