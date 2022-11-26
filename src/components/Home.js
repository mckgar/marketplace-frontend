import { useEffect, useState } from "react";
import { fetchHomePageItems } from "../server-calls";
import ViewItems from "./ViewItems";

const Home = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      const res = await fetchHomePageItems();
      setItems(res);
    }
    getItems();
  }, []);

  return (
    <main>
      <h2>Check out these items</h2>
      <ViewItems items={items} />
    </main>
  );
}

export default Home;
