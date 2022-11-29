import ViewItems from "./ViewItems";
import './ViewItems.css';

const Cart = props => {
  return (
    <main>
      <h2>You have {props.cart.length} item{props.cart.length === 1 ? '' : 's'} in your cart!</h2>
      <ViewItems items={props.cart} cart={true} removeFromCart={props.removeFromCart} />
    </main>
  );
}

export default Cart;
