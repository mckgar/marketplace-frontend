import ItemCard from "./ItemCard";

const ViewItems = props => {
  const cards = props.items.map((itemid, index) => {
    return <ItemCard key={index} itemid={itemid} />
  });
  
  return (
    <div id="items">
      {cards}
    </div>
  )
}

export default ViewItems;
