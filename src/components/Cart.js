import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, populateCart } from "../features/cart/cartSlice";
import ViewItems from "./ViewItems";
import CartSummary from "./CartSummary";
import Loader from "./Loader";
import './styles/Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, populated, isLoading, isSuccess, isError, message } = useSelector(state => state.cart);
  
  const [expandedCart, setExpandedCart] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isSuccess || populated) {
      setExpandedCart(populated);
    }
    if (isError) {
      setError(message);
    }
    dispatch(reset());
  }, [populated, isSuccess, isError, message, dispatch]);

  useEffect(() => {
    dispatch(populateCart());
  }, [cart, dispatch]);

  if (isLoading) {
    return (
      <main id="cart">
      <div className="cart-content">
        <h2>You have {cart.length} item{cart.length === 1 ? '' : 's'} in your cart!</h2>
        <Loader />
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <Loader />
      </div>
    </main>
    );
  } else if (error) {
    return (
      <main id='cart'>
        {error}
      </main>
    );
  }

  return (
    <main id="cart">
      <div className="cart-content">
        <h2>You have {cart.length} item{cart.length === 1 ? '' : 's'} in your cart!</h2>
        {<ViewItems items={expandedCart} cart={true} />}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        {<CartSummary cart={expandedCart} />}
        {cart.length > 0 ?<div className="checkout-btn">Proceed to Checkout</div> : null}
      </div>
    </main>
  );
}

export default Cart;
