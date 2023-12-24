// import './components/Header'
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Footer from './components/Footer';
import Bookdetails from './pages/Bookdetails';
import Layout from './components/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import { Private } from './components/private';
import { AddBookForm } from './components/AddBooksForm';


export const path = {
  register: '/signup',
  login: '/login',
  home: '/',
  bookdetails: '/bookdetails',
  shoppingcart: '/shoppingcart',
  checkout: '/checkout',
  addBook: '/addbook'
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={path.login} element={<Login />} />
          <Route path={path.register} element={<SignUp />} />
          <Route path={path.home} element={<Home />} />
          <Route path='/' element={<Private />}>
            <Route path={path.checkout} element={<Checkout />} />
            <Route path={path.addBook} element={<AddBookForm />} />
            <Route path={path.shoppingcart} element={<ShoppingCart />} />
            <Route path={`${path.bookdetails}/:bookId`} element={<Layout><Bookdetails /></Layout>} />
          </Route>

        </Routes>
      </BrowserRouter>
      {/* <Header/> */}
      {/* <Home/> */}
    </div>
  );
}

export default App;
