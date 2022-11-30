import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Cart from './components/Cart';
import Home from './components/Home';
import ItemInfo from './components/ItemInfo';
import NotFound from './components/NotFound';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/item/:itemid' element={<ItemInfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
