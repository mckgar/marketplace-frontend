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
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='/item/:itemid' element={<ItemInfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/account/:username' element={<Account />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/post' element={<ItemForm />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouteSwitch;
