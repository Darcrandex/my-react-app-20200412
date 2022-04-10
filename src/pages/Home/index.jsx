/**
 * @name Home
 * @description
 * @author darcrand
 */

import { Link } from "react-router-dom";
import { useCounter } from "@/stores/use-counter";
import { apiGetTopics } from "@/apis/common";
import { useQuery } from "react-query";

const Home = () => {
  const { count, add, sub } = useCounter();

  const { data: topicRes, refetch } = useQuery("get/topics", apiGetTopics, {
    placeholderData: { data: [] },
  });

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
    </>
  );
};

export default Home;
