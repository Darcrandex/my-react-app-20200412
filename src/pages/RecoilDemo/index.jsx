/**
 * @name App
 * @description
 * @author darcrand
 */

import { useCounterById } from '@/stores/use-counter-by-id'

const Counter = ({ id }) => {
  const { count, add } = useCounterById(id)
  return (
    <>
      <p>id: {id}</p>
      <p>count: {count}</p>
      <p>
        <button onClick={add}>add</button>
      </p>
    </>
  )
}

const App = () => {
  return (
    <>
      <h1>App</h1>
      <Counter id="123" />
      <Counter id="456" />
    </>
  )
}

export default App
