import { useState } from 'react';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <Header count={cart.length} />
      <Outlet
        context={[cart, setCart]}
      />
    </div>
  );
}

export default App;
