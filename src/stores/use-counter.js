import { useState, useMemo } from 'react'
import { atom, useRecoilState } from 'recoil'
import { sleep } from '@/utils'

const stateAtom = atom({ key: 'counter', default: 0 })

export function useCounter() {
  const [count, setCount] = useRecoilState(stateAtom)
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
