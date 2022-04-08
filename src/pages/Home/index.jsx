/**
 * @name Home
 * @description
 * @author darcrand
 */

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <p>
        <Link to="/about">About</Link>
      </p>
    </>
  );
};

export default Home;
