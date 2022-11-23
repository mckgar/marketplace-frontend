import Navbar from "./Navbar";
import './Header.css';

const Header = props => {
  return (
    <header>
      <h1>Marketplace</h1>
      <Navbar count={props.count} />
    </header>
  )
}

export default Header;
