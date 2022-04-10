/**
 * @name App
 * @description
 * @author darcrand
 */

import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routes } from './routes'

const App = () => {
  return (
    <>
      <h1>App</h1>
      <Suspense fallback="loading...">{useRoutes(routes)}</Suspense>
    </>
  )
}

export default App
