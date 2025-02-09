import {yupResolver} from '@hookform/resolvers/yup'
import {ILoginForm} from 'interfaces/yup.interface'
import {useTranslation} from 'react-i18next'
import {useActions, useAuth} from 'hooks'
import styles from './styles.module.scss'
import {Button, Input} from 'components'
import {useForm} from 'react-hook-form'
import {loginSchema} from 'helpers/yup'
import {LoginLogo} from 'assets/icons'
import {FIELD} from 'constants/fields'


const Index = () => {
	const {t} = useTranslation()
	const {isLoading} = useAuth()
	const {login} = useActions()

	const {
		register,
		handleSubmit,
		formState: {errors}
	} = useForm({
		mode: 'onTouched',
		defaultValues: {
			username: '',
			password: ''
		},
		resolver: yupResolver(loginSchema)
	})

	return (
		<div className={styles.root}>
			<div className={styles.left}>
				<LoginLogo/>
			</div>

			<div className={styles.wrapper}>
				<h1>{t('Login to the system')}</h1>
				<form onSubmit={handleSubmit((data: ILoginForm) => login(data))}>
					<Input
						id="login"
						type={FIELD.TEXT}
						label="Login"
						required={true}
						error={errors?.username?.message}
						placeholder={'Enter your login'}
						{...register('username')}
					/>
					<Input
						id="password"
						type={FIELD.PASSWORD}
						label="Password"
						required={true}
						error={errors?.password?.message}
						placeholder="Enter your password"
						{...register('password')}
					/>
					<Button disabled={isLoading} type={FIELD.SUBMIT}>
						Enter
					</Button>
				</form>
			</div>
		</div>
	)
}

export default Index
