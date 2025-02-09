import {IRole} from 'interfaces/authentication.interface'
import {ROLE_LIST} from 'constants/roles'


const routeByRole = (role: IRole = ROLE_LIST.ADMIN): string => {
	switch (role) {
		case ROLE_LIST.ADMIN:
			return '/'
		default:
			return '/'
	}
}

export {
	routeByRole
}