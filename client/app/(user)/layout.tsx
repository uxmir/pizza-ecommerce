
import React, { ReactNode } from 'react'

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="font-sans w-full min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

export default Layout;