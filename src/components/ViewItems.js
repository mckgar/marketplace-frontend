import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";

const ViewItems = props => {
  const [cards, setCards] = useState(null);

  useEffect(() => {
    const populateCards = () => {
      const deck = props.items.map((itemid, index) => {
        return <ItemCard key={index} itemid={itemid} />
      });
      setCards(deck);
    }
    populateCards();
  }, [props.items]);
  
  return (
    <div id="items">
      {cards}
    </div>
  )
}

export default ViewItems;
