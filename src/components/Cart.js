import ViewItems from "./ViewItems";
import './Cart.css';
import './ViewItems.css';
import CartSummary from "./CartSummary";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const [page, setPage] = useState(<main id='cart'>Loading...</main>);

  // Determine page layout
  useEffect(() => {
    if (cart.length > 0) {
      setPage(
        <main id="cart">
          <div className="cart-content">
            <h2>You have {cart.length} item{cart.length === 1 ? '' : 's'} in your cart!</h2>
            <ViewItems items={cart} cart={true} />
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <CartSummary cart={cart} />
            <div className="checkout-button">Proceed to Checkout</div>
          </div>
        </main>
      );
    } else {
      setPage(<main id="cart">
        <div className="cart-content">
          <h2>You have no items in your cart!</h2>
        </div>
      </main>
      );
    }
  }, [cart]);

  return page;
}

export default Cart;
