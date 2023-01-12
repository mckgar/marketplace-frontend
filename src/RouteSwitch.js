import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Cart from './components/Cart';
import Home from './components/Home';
import ItemInfo from './components/ItemPage';
import NotFound from './components/NotFound';
import Account from './components/Account';
import Login from './components/Login';
import Register from './components/Register';
import ItemForm from './components/ItemForm';

const RouteSwitch = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/marketplace-frontend' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/marketplace-frontend/item/:itemid' element={<ItemInfo />} />
          <Route path='/marketplace-frontend/cart' element={<Cart />} />
          <Route path='/marketplace-frontend/account/:username' element={<Account />} />
          <Route path='/marketplace-frontend/login' element={<Login />} />
          <Route path='/marketplace-frontend/register' element={<Register />} />
          <Route path='/marketplace-frontend/post' element={<ItemForm />} />
          <Route path='/marketplace-frontend/*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
