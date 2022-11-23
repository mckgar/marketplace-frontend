import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';

const App = props => {
  return (
    <div className="App">
      <Header count={props.count} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
