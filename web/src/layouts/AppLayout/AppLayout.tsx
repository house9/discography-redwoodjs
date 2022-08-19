import { Toaster } from '@redwoodjs/web/toast'

import Navigation from './Navigation'

type AppLayoutProps = {
  children: React.ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div>
      <h1 className="text-5xl mt-2 mb-6 ml-2">Discography</h1>
      <hr />
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Navigation />
      <hr />
      <>{children}</>
      <hr />
    </div>
  )
}

export default AppLayout
