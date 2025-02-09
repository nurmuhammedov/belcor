import {Logout, SelectIcon, Status} from 'assets/icons'
// import {ROLE_LABEL, ROLE_LIST} from 'constants/roles'
import {useTranslation} from 'react-i18next'
import styles from './styles.module.scss'
import {useActions, useAuth} from 'hooks'
import classNames from 'classnames'
import {useState} from 'react'


const Index = () => {
	const {t} = useTranslation()
	const [accountIsOpen, setAccountIsOpen] = useState(false)
	const {user, isLoading} = useAuth()
	const {logout} = useActions()


	return (
		<div className={styles.root}>
			<div className={styles['role-label']}>
				{/*{t(ROLE_LABEL[user?.role ?? ROLE_LIST.ADMIN])}*/}
			</div>
			<div className={styles['profile-container']}>
				<div
					onClick={() => setAccountIsOpen(p => !p)}
					className={classNames(styles.profile)}
				>
					<div className={styles['status-wrapper']}>
						<div className={styles.status}><Status/></div>
						<div className={styles.name}>{user?.fullName ?? 'Admin'}</div>
					</div>
					<div className={classNames(styles.icon, {[styles['active-icon']]: accountIsOpen})}><SelectIcon/>
					</div>
				</div>
				<div className={classNames(styles.account, {[styles['active-account']]: accountIsOpen})}>
					<div
						className={classNames(styles.logout, {[styles.isLoading]: isLoading})}
						onClick={() => logout()}
					>
						<Logout/>
						<span>{t('Logout')}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Index