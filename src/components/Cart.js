import { useOutletContext } from "react-router-dom";
import ViewItems from "./ViewItems";
import './ViewItems.css';

const Cart = () => {

  const [cart, setCart] = useOutletContext();

  const removeFromCart = itemid => {
    const index = cart.findIndex(item => item.itemid === itemid);
    setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
  }

  return (
    <main>
      <h2>You have {cart.length} item{cart.length === 1 ? '' : 's'} in your cart!</h2>
      <ViewItems items={cart} cart={true} removeFromCart={removeFromCart} />
    </main>
  );
}

export default Cart;
