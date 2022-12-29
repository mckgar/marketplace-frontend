const getItem = async (id, token) => {
  try {
    const response = await fetch(`/item/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const item = await response.json();
    return item;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getItems = async (price, category, offset, limit, token) => {
  const priceQ = ['relevent', 'low', 'high'].includes(price) ? `p=${price}` : 'p=relevent';
  const categoryQ = ['books', 'clothing', 'toys', 'games', 'accessories', 'decorations', 'office'].includes(category) ? `c=${category}` : 'c=all';
  const offsetQ = offset >= 0 ? `o=${offset}` : 'o=0';
  const limitQ = limit >= 10 && limit <= 100 ? `l=${limit}` : 'l=20';
  const queries = `?${priceQ}&${categoryQ}&${offsetQ}&${limitQ}`;
  try {
    const response = await fetch(`/item${queries}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const item = await response.json();
    return item;
  } catch (err) {
    return Promise.reject(err);
  }
};

const createItem = async (body, token) => {
  try {
    const response = await fetch(`/item`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (response.status === 201) {
      return response.body;
    }
    const res = await response.json();
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};

const itemService = { getItem, getItems, createItem };

export default itemService