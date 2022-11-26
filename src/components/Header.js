import Navbar from "./Navbar";
import './Header.css';
import { Link } from "react-router-dom";

const Header = props => {
  return (
    <header>
      <Link to='/' className="title">
        <h1>Marketplace</h1>
      </Link>
      <Navbar count={props.count} />
    </header>
  )
}

export default Header;
