import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reset, getItem } from '../features/item/itemSlice';
import { addToCart } from "../features/cart/cartSlice";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import './styles/ItemPage.css';

const ItemInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { response, isLoading, isSuccess, isError, message } = useSelector(state => state.item);

  const [item, setItem] = useState({});
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const add = quantity => {
    if (quantity > 0 && quantity <= item.quantity) {
      dispatch(
        addToCart({ itemid: params.itemid, quantity, maxQ: item.quantity })
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
    if (isSuccess || response) {
      setItem(response);
    }
    if (isError) {
      setError(message);
    }
    dispatch(reset());
  }, [response, isSuccess, isError, message, dispatch]);

  useEffect(() => {
    dispatch(getItem(params.itemid));
  }, [params, dispatch]);

  if (isLoading) {
    return (
      <Loader />
    );
  } else if (error) {
    return (
      <main>{error}</main>
    );
  }

  return (
    <main className="item-page">
      <div className="big-card">
        <div className="image-wrap">
          <img src={item.image} alt='item' />
        </div>
        <div className='item-view'>
          <div className="item-name">{item.name}</div>
          <div className="item-seller">{item.seller}</div>
          <div className="item-description">{item.description}</div>
          <div className='item-price'>${item.price}</div>
          <div className="item-category">{item.category}</div>
          <div className='item-quantity'>Available: {item.quantity}</div>
          <div className="add-cart">
            <div className="decrease-quantity" tabIndex={0} onClick={() => changeQuantity('-')}>-</div>
            <div className="quantity">{quantity}</div>
            <div className="increase-quantity" tabIndex={0} onClick={() => changeQuantity('+')}>+</div>
            <div className="add-btn" tabIndex={0} onClick={() => add(quantity)}>
              Add to Cart
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ItemInfo;
