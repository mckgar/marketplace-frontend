import { useEffect, useState } from 'react';
import { fetchItem } from '../server-calls';
import { Link } from 'react-router-dom';
import './ItemCard.css';

const ItemCard = props => {
  const [item, setItem] = useState({});

  useEffect(() => {
    const getItem = async () => {
      const res = await fetchItem(props.itemid);
      setItem(res);
    }
    getItem();
  }, [props.itemid])

  return (
    <div className='item-card'>
      <Link to={`/${props.itemid}`} className='item-image' >
        <img img={item.image} alt={item.name} />
      </Link>
      <Link to={`/${props.itemid}`} className="item-name" >{item.name}</Link>
      <div className='item-price'>${item.price}</div>
      <div className="item-seller">{item.seller}</div>
      <div className="item-category">{item.category}</div>
    </div>
  );
}

export default ItemCard;
