import './Header.css';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const cart = useSelector(state => state.cart);
  const username = null;

  let accountLink = <Link to={`/account/${username}`}>Profile</Link>;
  const logoutLink = <Link to='/logout'>Logout</Link>
  const loginLink = <Link to='/login'>Login</Link>;
  const registerLink = <Link to='/register'>Register</Link>;

  useEffect(() => {
    if (username) {
      accountLink = (
        <Link to={`/account/${username}`}>Hello, {username}</Link>
      );
    }
  }, [username]);

  return (
    <header>
      <Link to='/' className="title">
        <h1>Marketplace</h1>
      </Link>
      <nav>
        <Link to='/'>Home</Link>
        {username && accountLink}
        {username && logoutLink}
        {!username && loginLink}
        {!username && registerLink}
        <Link to='/cart'>Cart: {cart.length}</Link>
      </nav>
    </header>
  )
}

export default Header;
