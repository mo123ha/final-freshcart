import React ,{ useContext,useEffect,useState}from 'react'
  import{useNavigate, NavLink,Link}from 'react-router-dom'
import { UserContext } from './../UserContext/UserContext';
import { CartContext } from './../UserContext/CartContext';
import { WishList } from './../UserContext/WitshLIstContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let{userLogin, setuserLogin}=useContext(UserContext)
  let{getLoggedUserCart,countItems,setcountItems}=useContext(CartContext)
  let{countOfWish,setcountOfWish}=useContext(WishList)


//  async function countCart() {
//  let x=   await getLoggedUserCart()
//  if (x.data?.status=="success") {
//   // setCartCount(x.data)

  
//   console.log(
//     );
  
//   // setcount(x.data)
//  }
// //  console.log(x);
 
    
//   }

// useEffect(()=>{


//   countCart()

// },[])

  let navigate=useNavigate()
  function signout() {
  
    localStorage.removeItem("usertoken")
    setuserLogin(null)
    navigate("/login")
  }

  return (
<>


<nav className="bg-[#f8f9fa] border-gray-200 dark:bg-gray-900 dark:border-gray-700  fixed top-0  left-0 right-0  z-50">
      <div className="contanier1 mx-auto ">   

        <div className="flex justify-between items-center pb-2 ">
          <div className="flex items-center justify-between">
          <i   className='fas fa-cart-shopping text-[#4fa74f] text-3xl '></i>
    <h1 className='text-3xl  text-black font-semibold'>fresh cart</h1>
          </div>
          <div className="hidden md:flex space-x-4 justify-between">
          {userLogin?  <div className='p-4  text-gray-500 text-md  ' >
     <NavLink  to="" className="p-2">Home</NavLink>
     <NavLink  to="cart"  className="p-2 relative">Cart </NavLink>
     <NavLink  to="WishList"  className="p-2">Wish List</NavLink>
     <NavLink  to="products"  className="p-2">Products</NavLink>
     <NavLink  to="categories"  className="p-2">Categories</NavLink>
     <NavLink  to="brands"  className="p-2">Brands</NavLink>

    </div>:null}

   
          </div>
          <div className="hidden md:flex space-x-4 justify-between">
    <div>
    <div className='flex items-center justify-between'>

    <div className="icons  text-black text-xl  p-2 cursor-pointer relative">

{userLogin?<Link to={"/wishlist"}>
<i className='fas fa-heart text-red-600 cursor-pointer me-3'>
    <div className= 'p-3 rounded-md bg-white text-red-500 w-[20px] h-[20px] absolute bottom-6 left-5  flex justify-center items-center  text-sm '>
    
   
     {countOfWish <0? countOfWish==0:countOfWish}
    
  </div></i>
</Link>:null
}
</div>
<div className="icons  text-black text-xl  p-2 cursor-pointer relative">

{userLogin?<Link to={"/cart"}>
<i   className='fas fa-cart-shopping text-[#000000]'>
    <div className= 'p-3 rounded-md bg-[#4FA74F] text-white w-[20px] h-[20px] absolute bottom-6 left-5  flex justify-center items-center  text-sm '>
    
   
     {countItems}
    
  </div></i>
</Link>:null
}
</div>


<div className=' text-gray-500 text-xl  p-2'>
{ userLogin? <span className='cursor-pointer'  onClick={signout}   >sign out</span>:<>
  <NavLink   className="p-2" to="login">Login</NavLink>
  <NavLink className="p-2"       to="register">Register</NavLink>
</>}


 


</div>
  </div>
    </div>
    </div>


          <div className="md:hidden">   

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-400 focus:outline-none focus:border-gray-400 focus:border"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round"   
 strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
        <div   
 className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
   <div>
   {userLogin?<div className='p-4  text-gray-500 text-md  flex flex-nowrap flex-col ' >
     <NavLink  onClick={()=>{  setIsOpen(false)  }}  to="" className="p-2">Home</NavLink>
     <NavLink  onClick={()=>{  setIsOpen(false)  }} to="cart"  className="p-2 relative">Cart </NavLink>
     <NavLink onClick={()=>{  setIsOpen(false)  }}  to="WishList"  className="p-2">Wish List</NavLink>
     <NavLink onClick={()=>{  setIsOpen(false)  }}  to="products"  className="p-2">Products</NavLink>
     <NavLink onClick={()=>{  setIsOpen(false)  }}  to="categories"  className="p-2">Categories</NavLink>
     <NavLink  onClick={()=>{  setIsOpen(false)  }} to="brands"  className="p-2">Brands</NavLink>

     

    </div>:null}
    <div className='flex items-center justify-between'>
<div className="icons  text-black text-xl  p-2 cursor-pointer relative">

{userLogin?<Link onClick={()=>{  setIsOpen(false)  }} to={"/cart"}>
<i   className='fas fa-cart-shopping text-[#000000]'>
    <div className= 'p-3 rounded-md bg-[#4FA74F] text-white w-[20px] h-[20px] absolute bottom-6 left-5  '>
      <p className='text-sm  absolute bottom-1 text-center'>{countItems}</p>
  </div></i>
</Link>:null}
{userLogin?<Link onClick={()=>{  setIsOpen(false)  }} to={"/wishlist"}>
<i className='fas fa-heart text-red-600 cursor-pointer me-3  ms-10'>
    <div className= 'p-3 rounded-md bg-white text-red-500 ms-10 w-[20px] h-[20px] absolute bottom-6 left-5  flex justify-center items-center  text-sm '>
    
   
     {countOfWish <0? countOfWish==0:countOfWish}
    
  </div></i>
</Link>:null
}
</div>

<div className=' text-gray-500 text-xl  p-2'>
{ userLogin? <span className='cursor-pointer'  onClick={signout}   >sign out</span>:<>
  <NavLink  onClick={()=>{  setIsOpen(false)  }} className="p-2" to="login">Login</NavLink>
  <NavLink onClick={()=>{  setIsOpen(false)  }} className="p-2"       to="register">Register</NavLink>
</>}


 


</div>
  </div>
   </div>
         
        </div>
      </div>
    </nav>



</>
  )
}
