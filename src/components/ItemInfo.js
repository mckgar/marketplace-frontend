import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { fetchItem } from "../server-calls";
import './ItemInfo.css';

const ItemInfo = () => {
  const params = useParams();
  const [cart, setCart] = useOutletContext();

  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);

  const addToCart = (itemid, quantity) => {
    if (quantity > 0 && quantity <= item.quantity) {
      setCart([...cart, {itemid, quantity}]);
    }
  }

  useEffect(() => {
    const getItem = async () => {
      const res = await fetchItem(params.itemid);
      setItem(res);
    }
    getItem();
  }, [params]);

  return (
    <div className="item-page">
      <img img={item.image} alt={item.name} />
      <div className='item-view'>
        <div className="item-name">{item.name}</div>
        <div className="item-description">{item.description}</div>
        <div className='item-price'>${item.price}</div>
        <div className='item-quantity'>Available: {item.quantity}</div>
        <div className="item-seller">{item.seller}</div>
        <div className="item-category">{item.category}</div>
        <div className="item-date">{(new Date(item.date_added)).toLocaleString()}</div>
      </div>
      <div className="cart-options">
        <div className="add-cart">
          <input type='number' min={1} max={item.quantity} placeholder={1} value={quantity} onChange={e => setQuantity(e.target.value)} />
          <button onClick={() => addToCart(params.itemid, quantity)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ItemInfo;
