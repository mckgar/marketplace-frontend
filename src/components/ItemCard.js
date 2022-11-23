import './ItemCard.css';

const ItemCard = props => {
  const item = {
    id: props.itemid,
    name: 'Test Item',
    price: 6.99,
    seller: 'Seller'
  }

  return (
    <div className='item-card'>
      <img img={item.image} alt={item.name} />
      <div className="item-name">{item.name}</div>
      <div className='item-price'>${item.price}</div>
      <div className="item-seller">{item.seller}</div>
    </div>
  );
}

export default ItemCard;
