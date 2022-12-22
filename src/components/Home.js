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

  const filters = (
    <div className="filters">
      <select id="sort" onChange={e=> setPrice(e.target.value)} value={price}>
        <option value='relevent'>Relevent</option>
        <option value='low'>Price: Low to High</option>
        <option value='high'>Price: High to Low</option>
      </select>
      <select id='category' onChange={e => setCategory(e.target.value)} value={category}>
        <option value='all'>All Categories</option>
        <option value='accessories'>Accessories</option>
        <option value='books'>Books</option>
        <option value='clothing'>Clothing</option>
        <option value='decorations'>Decorations</option>
        <option value='games'>Games</option>
        <option value='office'>Office</option>
        <option value='toys'>Toys</option>
      </select>
      <select id='limit' onChange={e => setLimit(e.target.value)} value={limit}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );

  if (isLoading) {
    return (
      <main id='home'>
        <h2>Check out these items</h2>
        {filters}
        <Loader />
      </main>
    );
  } else if (error) {
    return (
      <main id='home'>
        <h2>Check out these items</h2>
        {filters}
        {error}
      </main>
    );
  }

  return (
    <main id='home'>
      <h2>Check out these items</h2>
      {filters}
      <ViewItems items={items} />
      <div className="page-btns">
        {offset > 0 ? <div className="page-btn" onClick={() => setOffset(offset - limit)}>Previous</div> : null}
        {items.length >= limit ? <div className="page-btn" onClick={() => setOffset(offset + limit)}>Next</div> : null}
      </div>
    </main>
  );
}

export default Home;
