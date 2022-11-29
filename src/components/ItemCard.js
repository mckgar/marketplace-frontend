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

  let quantity = null;

  if (props.quantity) {
    quantity = <div className='cart-quantity'>{props.quantity}</div>
  }

  let removeButton = null;

  if (props.cart) {
    removeButton = (
      <div className="remove-cart">
        <div onClick={() => props.removeFromCart(props.itemid)}>Remove from Cart</div>
      </div>
    );
  }

  return (
    <div className='item-card'>
      <Link to={`/${props.itemid}`} className='item-image' >
        <img img={item.image} alt={item.name} />
      </Link>
      <Link to={`/${props.itemid}`} className="item-name" >{item.name}</Link>
      <div className='item-price'>${item.price}</div>
      <div className="item-seller">{item.seller}</div>
      <div className="item-category">{item.category}</div>
      {quantity}
      {removeButton}
    </div>
  );
}

export default ItemCard;
