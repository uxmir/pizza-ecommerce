
import React, { ReactNode } from 'react'
import Nav from './Nav';

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="font-sans w-full min-h-screen flex flex-col">
      <Nav/>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default Layout;