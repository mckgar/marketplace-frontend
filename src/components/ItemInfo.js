import { useParams } from "react-router-dom";

const ItemInfo = props => {
  const params = useParams();
  const item = {
    id: 0,
    name: 'test item',
    description: 'this is a test item and this is what it is',
    price: 6.99,
    seller: 'Seller'
  };

  return (
    <div className="item-page">
      <div classname='item-view'>
        <img img={item.image} alt={item.name} />
        <div className="item-name">{item.name}</div>
        <div className="item-description">{item.description}</div>
        <div classname='item-price'>${item.price}</div>
        <div className="item-seller">From {item.seller}</div>
      </div>
      <div className="cart-options">
        <button onClick={() => props.addToCart(params.itemid)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ItemInfo;
