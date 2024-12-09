import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/aboutus';
import HomePage from './pages/HomePageWindow'
import Signup from './pages/Signup';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div className="App">
      <div><Toaster></Toaster></div>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><HomePage></HomePage></ProtectedRoutes>} ></Route>
        <Route path='/dashboard' element={<ProtectedRoutes><Home></Home></ProtectedRoutes>} ></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>

      </Routes>
    </div>
  );
}


export function ProtectedRoutes(props) {
  if (localStorage.getItem("User")) {
    return props.children;
  }
  else {
    return <Navigate to='/login'></Navigate>
  }
}

export default App;
