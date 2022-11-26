const fetchItem = async id => {
  /* try {
    const response = await fetch(`http://localhost:8080/item/${id}`);
    const item = await response.json();

    return item;
  } catch (err) {
    console.error(`Error fetching data: ${err}`);
  } */
  // Mock
  return {
    id: id,
    name: 'Test Item',
    description: 'This is an item',
    price: 6.99,
    quantity: 23,
    seller: 'Seller',
    category: 'Clothing',
    date_added: Date.now()
  }
}

const fetchHomePageItems = async () => {
  /* try {
    const response = await fetch(`http://localhost:8080/item?sort=top&limit=20`)
    const items = await response.json();
    return items;
  } catch (err) {
    console.error(`Error fetching data: ${err}`);
  } */
  // Mock
  return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
}

export { fetchItem, fetchHomePageItems };
