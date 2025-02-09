import React, {ReactPortal} from 'react'
import {Toaster} from 'react-hot-toast'
import {createPortal} from 'react-dom'


const Index: React.FC = (): ReactPortal => createPortal(<Toaster/>, document.querySelector('#alert') as HTMLElement)

export default Index