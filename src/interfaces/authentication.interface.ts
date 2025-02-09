import {ROLE_LIST} from 'constants/roles'


type IRole = ROLE_LIST.ADMIN

interface ILogin {
	id: number
	fullName: string
	role: IRole
}

interface IUser {
	fullName: string
	role: IRole
}

export type{
	ILogin,
	IUser,
	IRole
}