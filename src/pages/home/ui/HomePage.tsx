import type { IHomePageInterface } from '../model/types'

export function HomePage(props: IHomePageInterface) {
  return (
    <main className="page">
      <h1>{props.title}</h1>
      <div>{props.content}</div>
    </main>
  )
}
