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
      setCart([...cart, { itemid, quantity }]);
    }
  }

  const changeQuantity = type => {
    if (type === '+' && quantity < item.quantity) {
      setQuantity(quantity + 1);
    }
    if (type === '-' && quantity > 1) {
      setQuantity(quantity - 1);
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
        <div className="item-seller">{item.seller}</div>
        <div className="item-description">{item.description}</div>
        <div className='item-price'>${item.price}</div>
        <div className="item-category">{item.category}</div>
        <div className='item-quantity'>Available: {item.quantity}</div>
        <div className="add-cart">
          <div className="decrease-quantity" onClick={() => changeQuantity('-')}>-</div>
          <div className="quantity">{quantity}</div>
          <div className="increase-quantity" onClick={() => changeQuantity('+')}>+</div>
          <div className="add-button" onClick={() => addToCart(params.itemid, quantity)}>
            Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemInfo;
