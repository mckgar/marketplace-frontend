import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cart/cartSlice';
import './ItemCard.css';

const ItemCard = props => {
  const URL = `/item/${props.item.item_id}`;
  const accountURL = `/account/${props.item.seller}`;

  let quantity = null;
  let totalCost = null;
  let removeButton = null;

  const dispatch = useDispatch();

  const remove = () => {
    dispatch(
      removeFromCart(props.item.item_id)
    );
  }

  if (props.cart) {
    removeButton = (
      <div className="remove-cart">
        <div onClick={remove}>Remove from Cart</div>
      </div>
    );
    quantity = <div className='cart-quantity'>{props.quantity}</div>
    totalCost = (
      <div className='item-total-cost'>{(props.item.price * props.quantity).toFixed(2)}</div>
    );
  }

  return (
    <div className='item-card'>
      <Link to={URL} className='item-image-card' >
        <img src={props.item.image} alt={props.item.name} />
      </Link>
      <Link to={URL} className="item-name-card" >{props.item.name}</Link>
      <div className='item-price-card'>${props.item.price}</div>
      <Link to={accountURL} className="item-seller-card">{props.item.seller}</Link>
      <div className="item-category-card">{props.item.category}</div>
      {quantity}
      {totalCost}
      {removeButton}
    </div>
  );
}

export default ItemCard;
