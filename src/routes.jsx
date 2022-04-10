import { lazy } from 'react'
import Home from './pages/Home'
/**
 * @typedef {import('react-router-dom').RouteObject} RouteObject
 */

/** @type {RouteObject[]} */
const routeConfigs = [
  { path: '/', element: Home },
  { path: '/about', element: lazy(() => import('@/pages/About')) },
]

/**
 * @param {RouteObject[]} configs
 * @returns {RouteObject[]}
 */
function toRoutes(configs) {
  return configs.map((item) => {
    const { element, children, ...rest } = item
    let Element = element || <></>

    return {
      ...rest,
      element: <Element />,
      children: Array.isArray(children) ? toRoutes(children) : undefined,
    }
  })
}

export const routes = toRoutes(routeConfigs)
