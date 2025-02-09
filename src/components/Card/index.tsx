import {CSSProperties, FC, ReactNode} from 'react'
import styles from './styles.module.scss'
import classNames from 'classnames'


interface IProperties {
	children?: ReactNode;
	screen?: boolean;
	className?: string;
	shadow?: boolean;
	style?: CSSProperties;
}

const Index: FC<IProperties> = ({children, screen = true, shadow = false, className = '', style}) => {
	return (
		<div
			className={classNames(styles.root, className, {[styles.screen]: screen, [styles.shadow]: shadow})}
			style={style}
		>
			{children ?? null}
		</div>
	)
}

export default Index