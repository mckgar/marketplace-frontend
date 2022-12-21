import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, getItems } from '../features/item/itemSlice';
import ViewItems from "./ViewItems";
import Loader from "./Loader";

const Home = () => {
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState('relevent');
  const [category, setCategory] = useState('all');
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(20);
  const [error, setError] = useState(null);
  const { response, isLoading, isSuccess, isError, message } = useSelector(state => state.item);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess || response) {
      setItems(response);
    }
    if (isError) {
      setError(message);
    }
    dispatch(reset());
  }, [response, isSuccess, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getItems([price, category, offset, limit]));
  }, [price, category, offset, limit, dispatch]);

  if (isLoading) {
    return <Loader />;
  } else if (error) {
    return (
      <main>{error}</main>
    );
  }

  return (
    <main>
      <h2>Check out these items</h2>
      <ViewItems items={items} />
    </main>
  );
}

export default Home;
