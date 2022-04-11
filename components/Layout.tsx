import { ReactNode, VFC } from 'react'

interface Props {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-600 text-sm font-mono">
      {children}
    </div>
  )
}
