const mockItem = id => {
  return {
    id: id,
    name: 'Test Item',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nunc augue, maximus sed sagittis ut, facilisis at leo. Nunc pharetra odio ac nibh sodales consequat. Nam tempor ullamcorper nunc, sit amet ultrices elit accumsan et. Morbi quis tellus vitae velit pharetra condimentum. Quisque a pretium magna, vitae pulvinar augue. Ut dictum nisl nec lacus mattis imperdiet. Aenean a mattis tortor. Nunc viverra, felis non fringilla maximus, lectus lectus condimentum diam, nec porttitor dui arcu ac felis. Fusce posuere mi id erat auctor lobortis. Ut fermentum erat et accumsan faucibus. Quisque sollicitudin nunc massa, cursus sagittis ligula imperdiet ut. Curabitur vel efficitur sapien. Aenean pharetra at arcu id accumsan.',
    price: 6.99,
    quantity: 23,
    seller: 'Seller',
    category: 'Clothing',
    date_added: Date.now()
  };
}

const fetchItem = async id => {
  /* try {
    const response = await fetch(`http://localhost:8080/item/${id}`);
    const item = await response.json();

    return item;
  } catch (err) {
    console.error(`Error fetching data: ${err}`);
  } */
  // Mock
  return mockItem(id);
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
  const list = [];
  for (let i = 0; i < 20; i++) {
    list.push(mockItem(i));
  }
  return list;
}

export { fetchItem, fetchHomePageItems };
