import './styles/Header.css';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { ReactComponent as Logo } from '../images/M.svg';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const { cart } = useSelector(state => state.cart);
  const username = useSelector(state => state.auth.username);

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  const [accountLink, setAccountLink] = useState(<li><Link to={`/account/${username}`}>{username}</Link></li>);

  const logoutLink = <li><div className='logout-btn' onClick={onLogout}>Logout</div></li>
  const loginLink = <li><Link to='/marketplace-frontend/login'>Login</Link></li>;
  const registerLink = <li><Link to='/marketplace-frontend/register'>Register</Link></li>;
  const postLink = <li><Link to='/marketplace-frontend/post'>Post</Link></li>;


  useEffect(() => {
    if (username) {
      setAccountLink(
        <li><Link to={`/marketplace-frontend/account/${username}`}>{username}</Link></li>
      );
    }
  }, [username]);

  const toggleMenu = () => {
    document.getElementById('nav-icon').classList.toggle('selected');
    document.getElementById('nav-menu').classList.toggle('selected');

    document.getElementById('nav-menu').addEventListener('click', removeMenu);
  };

  const removeMenu = () => {
    document.getElementById('nav-icon').classList.remove('selected');
    document.getElementById('nav-menu').classList.remove('selected');

    document.getElementById('nav-menu').removeEventListener('click', removeMenu);
  };

  return (
    <header>
      <Link to='/marketplace-frontend' className="title">
        <Logo />
      </Link>
      <nav>
        <button id='nav-icon' onClick={toggleMenu}><FaBars /></button>
        <ul id='nav-menu'>
          <li>
            <Link to='/marketplace-frontend'>Home</Link>
          </li>
            {username && postLink}
            {username && accountLink}
            {username && logoutLink}
            {!username && loginLink}
            {!username && registerLink}
          <li>
            <Link to='/marketplace-frontend/cart'>Cart: {cart.length}</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;
