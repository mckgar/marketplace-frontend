import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../features/cart/cartSlice';
import './styles/ItemCard.css';
import {ReactComponent as Logo} from '../images/M.svg';

const ItemCard = props => {
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
      <div className="remove-btn">
        <div onClick={remove}>Remove</div>
      </div>
    );
    quantity = <div className='cart-quantity'>{props.quantity}</div>
    totalCost = (
      <div className='item-total-cost'>{(props.item.price * props.quantity).toFixed(2)}</div>
    );
  }

  let image = <Logo />;

  if (props.item.image) {
    image = <img src={props.item.image} alt='item' />;
  }

  return (
    <div className='item-card'>
      <Link to={`/marketplace-frontend/item/${props.item.item_id}`} className='item-image-card' >
        {image}
      </Link>
      <Link to={`/marketplace-frontend/item/${props.item.item_id}`} className="item-name-card" >{props.item.name}</Link>
      <div className='item-price-card'>${props.item.price}</div>
      <Link to={`/marketplace-frontend/account/${props.item.seller}`} className="item-seller-card">{props.item.seller}</Link>
      <div className="item-category-card">{props.item.category}</div>
      {quantity}
      {totalCost}
      {removeButton}
    </div>
  );
}

export default ItemCard;
