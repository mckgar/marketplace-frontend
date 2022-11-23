import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Cart from './components/Cart';
import Home from './components/Home';
import ItemInfo from './components/ItemInfo';

const RouteSwitch = () => {
  const [cart, setCart] = useState([]);

  const addToCart = itemid => {
    setCart([...cart, itemid]);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App count={cart.length} />}>
          <Route index element={<Home />} />
          <Route path=':itemid' element={<ItemInfo addToCart={addToCart} />} />
          <Route path='/cart' element={<Cart cart={cart} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
