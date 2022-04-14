import { useState, useMemo } from 'react'
import { atomFamily, useRecoilState } from 'recoil'
import { sleep } from '@/utils'

const stateAtomFn = atomFamily({ key: 'counter', default: 0 })

export function useCounterById(id) {
  const state = stateAtomFn(id)
  console.log('state', state)

  const [count, setCount] = useRecoilState(state)
  const [loading, setLoading] = useState(false)
  const isMinus = useMemo(() => count < 0, [count])

  const add = () => setCount((curr) => curr + 1)
  const subAsync = async () => {
    setLoading(true)
    await sleep()
    setCount((curr) => curr - 1)
    setLoading(false)
  }

  return { count, add, subAsync, loading, isMinus }
}
