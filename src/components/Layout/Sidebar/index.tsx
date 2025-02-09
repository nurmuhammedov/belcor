import {routeByRole} from 'utilities/authentication'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'
import {useAuth, useSideMenu} from 'hooks'
import styles from './styles.module.scss'
import SidebarItem from './SidebarItem'
import {FC} from 'react'


const Index: FC = () => {
	const navigate = useNavigate()
	const sideMenu = useSideMenu()
	const {t} = useTranslation()
	const {user} = useAuth()

	return (
		<aside className={styles.sidebar}>
			<div className={styles.header} onClick={() => navigate(routeByRole(user?.role))}>
				<p>{t('Task')}</p>
			</div>
			<ul className={styles.menu}>
				{
					sideMenu?.map((item) => (
						<li key={item?.id}>
							<SidebarItem {...item}/>
						</li>
					))
				}
			</ul>
		</aside>
	)
}

export default Index
