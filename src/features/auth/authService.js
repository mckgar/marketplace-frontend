const register = async body => {
  try {
    const response = await fetch(`/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const res = await response.json();
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};

const login = async body => {
  try {
    const response = await fetch(`/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const res = await response.json();
    return res;
  } catch (err) {
    return Promise.reject(err);
  }
};

const authService = { register, login };

export default authService; 
