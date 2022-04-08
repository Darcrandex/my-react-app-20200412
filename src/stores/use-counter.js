import { atom, useRecoilState } from "recoil";

const stateAtom = atom({ key: "counter", default: 0 });

export function useCounter() {
  const [count, setCount] = useRecoilState(stateAtom);
  const add = () => setCount((curr) => curr + 1);
  const sub = () => setCount((curr) => curr - 1);
  return { count, add, sub };
}
