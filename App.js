import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './API/Login';
import Register from './API/Register';
import Dashboard from './API/Dashboard';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' Component={Login}></Route>
        <Route path='/register' Component={Register}></Route>
        <Route path='/Dashboard' Component={Dashboard}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;