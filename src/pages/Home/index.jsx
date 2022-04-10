/**
 * @name Home
 * @description
 * @author darcrand
 */

import { Link } from 'react-router-dom'
import { useCounter } from '@/stores/use-counter'
import { apiGetTopics } from '@/apis/common'
import { useQuery } from 'react-query'
import { Button } from 'antd'

const Home = () => {
  const { count, add, sub } = useCounter()

  const { data: topicRes, refetch } = useQuery('get/topics', apiGetTopics, {
    placeholderData: { data: [] },
  })

  return (
    <>
      <h1>Home</h1>
      <p>
        <Link to="/about">About</Link>
      </p>

      <hr />
      <h2>counter</h2>
      <p>count: {count}</p>
      <p>
        <button onClick={add}>add</button>
        <button onClick={sub}>sub</button>
      </p>

      <hr />
      <button onClick={refetch}>get topics</button>
      <p>length {topicRes.data.length}</p>

      <hr />
      <Button type="primary">Antd Btn</Button>

      <hr />
      <p className="m-2 p-2 text-lg text-blue-400 border rounded">
        tailwind css
      </p>
    </>
  )
}

export default Home
