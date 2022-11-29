import { useOutletContext } from "react-router-dom";
import ViewItems from "./ViewItems";
import './Cart.css';
import './ViewItems.css';
import CartSummary from "./CartSummary";

const Cart = () => {
  const [cart, setCart] = useOutletContext();

  const removeFromCart = item => {
    const index = cart.findIndex(c => c.item.id === item.id);
    setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
  }

  return (
    <main id="cart">
      <div className="cart-content">
        <h2>You have {cart.length} item{cart.length === 1 ? '' : 's'} in your cart!</h2>
        <ViewItems items={cart} cart={true} removeFromCart={removeFromCart} />
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <CartSummary cart={cart} />
        <div className="checkout-button">Proceed to Checkout</div>
      </div>
    </main>
  );
}

export default Cart;
