import { Link } from 'react-router-dom';

const Navbar = props => {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/cart'>Cart: {props.count}</Link>
    </nav>
  );
}

export default Navbar;
