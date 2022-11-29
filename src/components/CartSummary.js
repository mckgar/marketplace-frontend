const CartSummary = props => {
  const itemSummary = props.cart.map((c, index) => {
    return (
      <div key={index} className="item-summary">
        <span>{c.item.name} x {c.quantity}</span>
        <span>${(c.item.price * c.quantity).toFixed(2)}</span>
      </div>
    );
  });

  let totalPrice = 0;
  for (const c of props.cart) {
    totalPrice += c.item.price * c.quantity;
  }

  const summary = (
    <div className="price-summary">
      {itemSummary}
      <div className="total-price">${totalPrice}</div>
    </div>
  );
  return summary;
}

export default CartSummary;
