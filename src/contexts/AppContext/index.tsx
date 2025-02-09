import {PropsWithChildren, createContext, useState} from 'react'
import {noop} from 'utilities/common'
import {Loader} from 'components'


interface IAppContext {
	isLoading: false,
	setIsLoading: (isLoading: boolean) => void,
}

const AppContext = createContext<IAppContext>({isLoading: false, setIsLoading: noop})

function AppContextProvider({children}: PropsWithChildren) {
	const [isLoading, setIsLoading] = useState<boolean>(true)

	if (isLoading) {
		return <Loader screen background/>
	}

	return (
		<AppContext.Provider value={{isLoading, setIsLoading}}>
			{children}
		</AppContext.Provider>
	)
}

export {AppContext, AppContextProvider}
