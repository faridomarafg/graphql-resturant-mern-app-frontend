import React from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import Headers from './components/Headers';
import Dashboard from './pages/dashboard/Dashboard';
import Food from './pages/dashboard/Food';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import WishList from './pages/WishList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetails from './pages/OrderDetails';
import Account from './pages/Account';
import Success from './pages/Success';
import AdminRoute from './components/AdminRoute';
import Footer from './components/Footer';


const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Headers/>
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/verify-email/:token' element={<VerifyEmail/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/reset-password/:resetToken' element={<ResetPassword/>}/>
          <Route path='/food/:id' element={<Food/>}/>
          <Route path='/order-details/:id' element={<OrderDetails/>}/>
          <Route path='/wish-list' element={<WishList/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/success' element={<Success/>}/>



          <Route path='/dashboard/*' element={<AdminRoute><Dashboard/></AdminRoute>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App