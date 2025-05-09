import './App.css';
import {Routes,Route} from 'react-router-dom';
import Header from './pages/header/Header';
import Signup from './pages/auth/components/signup/Signup'
import Signin from './pages/auth/components/signin/Signin'
import AdminDashboard from './pages/admin/components/dashboard/AdminDashboard';
import CustomerDashboard from './pages/customer/components/dashboard/CustomerDashboard';
import PostBook from './pages/admin/components/post-book/PostBook';
import UpdateBook from './pages/admin/components/update-book/UpdateBook';
import ViewOrders from './pages/admin/components/view-orders/ViewOrders';
import Cart from './pages/customer/components/cart/Cart';
import MyOrders from './pages/customer/components/my-orders/MyOrders';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/login' element={<Signin/>}/>

        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/book/post' element={<PostBook/>}/>
        <Route path='/admin/book/:id/edit' element={<UpdateBook/>}/>
        <Route path='/admin/orders' element={<ViewOrders/>}/>

        <Route path='/customer/dashboard' element={<CustomerDashboard/>}/>
        <Route path='/customer/cart' element={<Cart/>}/>
        <Route path='/customer/orders' element={<MyOrders/>}/>
      </Routes>
    </>
  );
}

export default App;
