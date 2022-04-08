/**
 * @name Home
 * @description
 * @author darcrand
 */

import { Link } from "react-router-dom";
import { useCounter } from "@/stores/use-counter";

const Home = () => {
  const { count, add, sub } = useCounter();
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
    </>
  );
};

export default Home;
