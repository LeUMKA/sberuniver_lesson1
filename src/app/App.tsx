import { routes } from './router'

export function App() {
  const rootRoute = routes.find((route) => route.path === '/')

  return <div className="app">{rootRoute?.element}</div>
}
