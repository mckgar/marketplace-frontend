import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = props => {
  return (
    <div className="App">
      <Header count={props.count} />
      <Outlet />
    </div>
  );
}

export default App;
