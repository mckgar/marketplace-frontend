import { Link } from 'react-router-dom';
import './ItemCard.css';

const ItemCard = props => {
  let quantity = null;
  let totalCost = null;
  let removeButton = null;

  if (props.cart) {
    removeButton = (
      <div className="remove-cart">
        <div onClick={() => props.removeFromCart(props.item)}>Remove from Cart</div>
      </div>
    );
    quantity = <div className='cart-quantity'>{props.quantity}</div>
    totalCost = (
      <div className='item-total-cost'>{(props.item.price * props.quantity).toFixed(2)}</div>
    );
  }

  return (
    <div className='item-card'>
      <Link to={`/${props.item.id}`} className='item-image-card' >
        <img src={props.item.image} alt={props.item.name} />
      </Link>
      <Link to={`/${props.item.id}`} className="item-name-card" >{props.item.name}</Link>
      <div className='item-price-card'>${props.item.price}</div>
      <div className="item-seller-card">{props.item.seller}</div>
      <div className="item-category-card">{props.item.category}</div>
      {quantity}
      {totalCost}
      {removeButton}
    </div>
  );
}

export default ItemCard;
