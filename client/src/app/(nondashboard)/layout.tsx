import Navbar from '@/components/Navbar'
import { NAVBAR_HEIGHT } from '@/lib/constants'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <div className = "h-full w-full">

      </div>
         <Navbar/>  
        <main className = {'h-full flex w-full flex-1 flex-col '}
        style={{paddingTop : `${NAVBAR_HEIGHT}px`}}
        >
            {children}
        </main>
        
    </div>
  )
}

export default Layout