import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const ViewItems = props => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const populateCards = () => {
      const deck = props.items.map((item, index) => {
        return <ItemCard 
          key={index}
          itemid={item.itemid || item}
          quantity={item.quantity}
          cart={props.cart}
          removeFromCart={props.removeFromCart}
        />
      });
      setCards(deck);
    }
    populateCards();
  }, [props]);
  
  return (
    <div id="items">
      {cards}
    </div>
  )
}

export default ViewItems;
