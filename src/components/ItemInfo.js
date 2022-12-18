import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchItem } from "../server-calls";
import './ItemInfo.css';

import { addToCart } from "../features/cart/cartSlice";

const ItemInfo = () => {
  const params = useParams();

  const dispatch = useDispatch();

  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);

  const add = quantity => {
    if (quantity > 0 && quantity <= item.quantity) {
      dispatch(
        addToCart({ item: item, quantity })
      );
      setQuantity(1);
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
      res.item.item_id = params.itemid;
      setItem(res.item);
    }
    getItem();
  }, [params]);

  return (
    <main className="item-page">
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
          <div className="add-button" onClick={() => add(quantity)}>
            Add to Cart
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemInfo;
