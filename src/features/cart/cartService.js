const populate = async (cart, token) => {
  try {
    const populated = [];
    for (const item of cart) {
      const response = await fetch(`/item/${item.itemid}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const pop = await response.json();
      if (pop.message) return item;
      pop.item.item_id = item.itemid;
      populated.push({ item: pop.item, quantity: item.quantity});
    }
    return { populated };
  } catch (err) {
    return Promise.reject(err);
  }
}

const cartService = { populate };

export default cartService;