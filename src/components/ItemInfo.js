import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchItem } from "../server-calls";

const ItemInfo = props => {
  const params = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    const getItem = async () => {
      const res = await fetchItem(params.itemid);
      setItem(res);
    }
    getItem();
  }, [params]);

  return (
    <div className="item-page">
      <div className='item-view'>
        <img img={item.image} alt={item.name} />
        <div className="item-name">{item.name}</div>
        <div className="item-description">{item.description}</div>
        <div className='item-price'>${item.price}</div>
        <div className='item-quantity'>Available: {item.quantity}</div>
        <div className="item-seller">{item.seller}</div>
        <div className="item-category">{item.category}</div>
        <div className="item-date">{item.date_added}</div>
      </div>
      <div className="cart-options">
        <button onClick={() => props.addToCart(params.itemid)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ItemInfo;
