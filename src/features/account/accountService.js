const getAccount = async (username, token) => {
  try {
    const response = await fetch(`/account/${username}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const account = await response.json();
    return account;
  } catch (err) {
    return Promise.reject(`Error fetching data: ${err}`);
  }
};

const accountService = { getAccount };

export default accountService;
