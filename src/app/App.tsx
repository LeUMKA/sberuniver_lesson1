import { routes } from './router'

function App() {
  const rootRoute = routes.find((route) => route.path === '/')

  return <div className="app">{rootRoute?.element}</div>
}

export default App
