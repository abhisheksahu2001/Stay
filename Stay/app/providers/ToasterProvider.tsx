'use client'
import {Toaster} from 'react-hot-toast'

const ToasterProvider = () => {
  return (
    <Toaster/>
  )
}

export default ToasterProvider




// Important Note when using third party ui
// don't directly import component in client side always use a warper function