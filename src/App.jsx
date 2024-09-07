import './App.css';
import"../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
import UserContextProvider from './components/UserContext/UserContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductDetails from './components/ProductDetails/ProductDetails';

import 'flowbite';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './components/UserContext/CartContext';
import { Toaster } from 'react-hot-toast';
import { WishListProvider } from './components/UserContext/WitshLIstContext';
import WishList from './components/WishList/WishList';
import { SearchContextProvider } from './components/UserContext/SearchContext';
import CheckOut from './components/CheckOut/CheckOut';
import AllOrders from './components/AllOrders/AllOrders';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import Verfiycode from './components/verfiycode/verfiycode';
// import updatePassword from './components/updateLoggedUserPassword/updatePassword';
import UpdatePassword from './components/updateLoggedUserPassword/updatePassword';




let x=createBrowserRouter([{path:"", element:<Layout/>,children:[
  {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
  {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
  {path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
  {path:"brands",element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:"products",element:<ProtectedRoute><Products/></ProtectedRoute>},
  {path:"login",element:<Login/>},
  {path:"checkout",element:<CheckOut/>},
  {path:"allorders",element:<AllOrders/>},
  {path:"register",element:<Register/>},
  {path:"forgetPassword",element:<ForgetPassword/>},
  {path:"verify",element:<Verfiycode />},
  {path:"updatePassword",element:<UpdatePassword/>},
  {path:"productdetails/:id/:category",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
  // {path:"brands/:id",element:<ProtectedRoute><Brands/></ProtectedRoute>},
  {path:"wishlist",element:<ProtectedRoute><WishList/></ProtectedRoute>},
  {path:"*",element:<Notfound/>}
]}])




let query =new QueryClient()
function App() {

  return   (
    <>

  <UserContextProvider>
    
 <QueryClientProvider  client={query}>

<CartContextProvider>

<WishListProvider>

{/* <searchContextProvider> */}
   <RouterProvider   router={x}> </RouterProvider>
   {/* </searchContextProvider> */}

</WishListProvider>


<Toaster/>

</CartContextProvider>

 </QueryClientProvider>
  </UserContextProvider>
 
  </>
  )
}

export default App;
