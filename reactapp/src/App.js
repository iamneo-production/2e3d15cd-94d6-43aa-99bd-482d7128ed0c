import './App.css';
import Login from './pages/login';
import Signup from './pages/signup';
import ForgotPassword from './pages/forgotpassword';
import Home from './pages/home';
import { Routes,Route } from 'react-router-dom';
import store from './redux/store';
import Explore from './pages/explore';
import { Provider } from 'react-redux';
import Book from './pages/book';
import MyBooks from './pages/mybooks';
import Cart from "./pages/cart";
import Profile from './pages/profile';

function App() {
  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/book/:id" element={<Book/>}/>
      <Route path="/explore" element={<Explore/>}/>
      <Route path="/my-books" element={<MyBooks/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/profile" element={<Profile/>}/>
    </Routes>
    </Provider>
  );
}

export default App;
