import {IRole} from 'interfaces/authentication.interface'
import {IMenuItem} from 'interfaces/common.interface'
import {menu} from 'configurations/menu'
import {useAuth} from 'hooks'
import {useMemo} from 'react'


const pickOnlyAllowedMenu = (menuItem: IMenuItem, role: IRole) => menuItem.allowedRoles?.includes(role)
const sortMenu = (a: IMenuItem, b: IMenuItem, role: IRole) => a?.order?.[role] - b?.order?.[role]

export default function useSideMenu() {
	const {user} = useAuth()

	return useMemo(() => {
			return user ?
				menu
					.filter((menuItem) => pickOnlyAllowedMenu(menuItem, user.role))
					.sort((a, b) => sortMenu(a, b, user.role)) :
				[]
		},
		[user]
	)
}
