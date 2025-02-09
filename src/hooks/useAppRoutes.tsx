import {Navigate, useRoutes} from 'react-router-dom'
import {routeByRole} from 'utilities/authentication'
import {Home, Login, History} from 'screens'
import {ROLE_LIST} from 'constants/roles'
import {Layout, Loader} from 'components'
import {useAuth} from 'hooks'


function useAppRoutes() {
	const {user, isLoading} = useAuth()

	if (isLoading) {
		return <Loader screen background/>
	}

	const routes = {
		[ROLE_LIST.ADMIN]: [
			{
				path: '/',
				element: <Layout/>,
				children: [
					{
						index: true,
						element: <Home/>
					},
					{
						path: 'history',
						element: <History/>
					}
				]
			},
			{
				path: '*',
				element: <Navigate to={routeByRole(user?.role)} replace/>
			}
		],
		default: [
			{
				path: '/login',
				element: <Login/>
			},
			{
				path: '*',
				element: <Navigate to="/login" replace/>
			}
		]
	}

	return useRoutes(user?.role ? routes[user.role] : routes.default)
}

export default useAppRoutes
