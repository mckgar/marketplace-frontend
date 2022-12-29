import './styles/Header.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import {ReactComponent as Logo} from '../images/M.svg';

const Header = () => {
  const { cart } = useSelector(state => state.cart);
  const username = useSelector(state => state.auth.username);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  const [accountLink, setAccountLink] = useState(<Link to={`/account/${username}`}>{username}</Link>);

  const logoutLink = <div className='logout-btn' onClick={onLogout}>Logout</div>
  const loginLink = <Link to='/login'>Login</Link>;
  const registerLink = <Link to='/register'>Register</Link>;
  const postLink = <Link to='/post'>Post</Link>;


  useEffect(() => {
    if (username) {
      setAccountLink(
        <Link to={`/account/${username}`}>{username}</Link>
      );
    }
  }, [username]);

  return (
    <header>
      <Link to='/' className="title">
        <Logo />
        {/* <img src='../images/M.svg' alt='Marketplace' /> */}
      </Link>
      <nav>
        <Link to='/'>Home</Link>
        {username && postLink}
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
