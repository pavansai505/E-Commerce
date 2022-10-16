
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Login from './components/login/login';
// import Navbar from './components/navbar/navbar';
import Signin from './components/signin/signin';
import Signup from './components/signup/signup';
import Wishlist from './components/wishlist/wishlist';
import NavBar from './components/navbar/navbar'
import Cart from './components/cart/cart';
import ProductStatus from './components/admin/productStatus/productStatus';
import ManageUsers from './components/admin/manageUsers/manageUsers';
import SaleReport from './components/admin/saleReport/salereport';
import ManageProducts from './components/admin/manageProducts/manageproducts';
import CreateProduct from './components/admin/createProduct/createproduct';
import { useState } from 'react';
import AdminSignin from './components/admin/signin/signin';
import AdminSignup from './components/admin/signup/signup';
import Home from './components/home/home';
import Thankyou from './components/thankyou/thankyou';
import Orders from './components/admin/orders/orders';
import Dashboard from './components/admin/dashboard/dashboard';
import BulkUpload from './components/admin/bulkupload/bulkupload';
import ErrorPage from './components/404/errorPage';
import UserUpdate from './components/admin/userUpdate/userupdate';
import UpdateProduct from './components/admin/updateProduct/updateproduct';
import SimpleAccordion from './components/admin/manageUsers/fails';
import Discount from './components/admin/discount/discount';
import Coupon from './components/coupon/coupons';
function App() {
  const [signedin,setSignedIn]=useState(false)
  const [userType,setUserType]=useState('user')
  return (
    <div className="App">
      {/* nav bar */}
       <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/signin' element={<Signin></Signin>}></Route>
      <Route path='/admin/signin' element={<AdminSignin></AdminSignin>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/admin/signup' element={<AdminSignup></AdminSignup>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/wishlist' element={<Wishlist></Wishlist>}></Route>
      <Route path='/cart' element={<Cart></Cart>}></Route>
      <Route path='/coupons' element={<Coupon></Coupon>}></Route>
      <Route path='/thankyou' element={<Thankyou></Thankyou>}></Route>
      <Route path='*' element={<ErrorPage></ErrorPage>}></Route>
      <Route path='/test' element={<SimpleAccordion></SimpleAccordion>}></Route>
      {/* admin pages */}
      <Route path='/createproduct' element={<CreateProduct></CreateProduct>}></Route>
      <Route path='/orders' element={<Orders></Orders>}></Route>
      <Route path='/productstatus' element={<ProductStatus></ProductStatus>}></Route>
      <Route path='/salereport' element={<SaleReport></SaleReport>}></Route>
      <Route path='/manageusers' element={<ManageUsers></ManageUsers>}></Route>
      <Route path='/updateuser/:id' element={<UserUpdate></UserUpdate>}></Route>
      <Route path='/manageproducts' element={<ManageProducts></ManageProducts>}></Route>
      <Route path='/updateproduct/:id' element={<UpdateProduct></UpdateProduct>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      <Route path='/bulkupload' element={<BulkUpload></BulkUpload>}></Route>
      <Route path='/discount' element={<Discount></Discount>}></Route>
    </Routes>
    </div>
  );
}

export default App;
