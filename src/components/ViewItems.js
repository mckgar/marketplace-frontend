import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import './styles/ViewItems.css';

const ViewItems = props => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const populateCards = () => {
      const deck = props.items.length > 0 ? props.items.map((c, index) => {
        return <ItemCard 
          key={index}
          item={c.item || c}
          quantity={c.quantity}
          cart={props.cart}
        />
      }) : [];
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
