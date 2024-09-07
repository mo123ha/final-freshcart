import React, { useEffect } from 'react'

import {  useState, useContext } from 'react';
import { CartContext } from './../UserContext/CartContext';

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export default function Cart() {
let{updateCartProductQuantity,deleteCartItem,getLoggedUserCart,deleteAllCart}=useContext(CartContext)
const [cartdetails, setcartdetails] = useState([])
const [count, setcount] = useState(null)
const [cartempty, setcartempty] = useState(false)
const [lodaing, setloading] = useState(null)
const [loadingCount, setloadingCount] = useState(false)
const [loadingId, setloadingId] = useState(null)

let {addProductToCart,countItems,setcountItems}=useContext(CartContext)

async function getCart() {
  // setloading(true)

  setcartempty(true)
 
  let resopnse=await getLoggedUserCart()
console.log(resopnse);

  if (resopnse?.data?.status=="success") {
    console.log(resopnse);
    setcartempty(false)
    setloading(false)
    setcartdetails(resopnse.data.data)
    setcount(resopnse.data)
  
    
  }
  
  
}


async function updateProduct(id,count) {

  setloadingCount(true)

  if (count==0) {
  // return
  deleteItem(id)
  }else{ 
    let response=await updateCartProductQuantity(id,count)
    // console.log(response.data.data.products._id);
    setloadingId(id)
    console.log(id);
    
    if (response.data.status=="success") {

      setloadingCount(false)
     setcartdetails(response.data.data)
   toast.success("product upadted successfuly")
      
    
  }
  else{
    toast.error("product  not upadted ")
  }
  }
 

}
async function deleteItem (productId) {
 let response=await deleteCartItem(productId)
 if (response.data.status=="success") {
  setcartdetails(response.data.data)
  console.log(response.data.data);
  
toast.success("product delete succcefuly")
// console.log(response);
  
}else{
  toast.error("product  not upadted ")

}
 
  
}

async function cartDelete() {
   let response= await deleteAllCart()
console.log(response);
if(response.statusText=="OK")
  setcountItems(countItems=0)

  setcartdetails(null)

  
}

useEffect(()=>{


    getCart()

},[])
  return (
                                       
<>    
{cartdetails?.length >0?<div className='bg-gray-50 h-[50x] py-20  my-8  '>
  <h1 className='text-4xl font-semibold ms-5'>my cart</h1>
  <h1 className='text-4xl font-semibold ms-5'>my cart is empty</h1>

 
</div> :<>
  <div className="relative overflow-x-auto my-10 shadow-md sm:rounded-lg bg-gray-50 rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">

    </thead>
    <tbody>
    <div className=' flex justify-between items-center  my-4 py-4 '>
<h1 className=' ms-4  font-semibold inline-block text-black  text-3xl   '> Cart Shop </h1>

<div className='md:me-4 text-center sm:me-0'>
<Link to="/checkout"><button className= 'bg-blue-500 text-white w-[120px] h-[40px]  rounded-lg inline-block text-center  m-auto  '>Check Out</button></Link>
</div>
  </div>
  <div className='  flex justify-between m-4 md:text-xl    sm:text-sm'>
<h1 className='sm:flex md:font-semibold text-black'>total Price:  <span className='text-[#22DB14]'>{cartdetails?.totalCartPrice}</span></h1>
<h1  className='mb:font-semibold text-black'>total number of items: <span className='text-[#22DB14]'> {countItems}</span></h1>
  </div>

    {cartdetails?.products?.map((product)=> <tr key={product.product._id}
     className="     flex flex-wrap   md:flex md:justify-between md:items-center   bg-gray-50 rounded-lg border-b dark:bg-gray-800 dark:border-gray-700  dark:hover:bg-gray-600">
        <td className="p-4 md:flex md:flex-nowrap md:items-center">
          <img src={product.product.imageCover} className="sm:w-full    md:w-[50%] h-[200px]   object-cover" alt="cart image"  />
          <td className="px-6 py-4 font-semibold text-black dark:text-white ">
          <div className=''>
          <p className='sm:text-lg font-semibold '>{product.product.title}</p>
          <p className='p-2'>    {product.price}</p>
          </div>
       <span className=" cursor-pointer   flex items-center sm:text-sm md:text-lg    font-medium text-red-600 dark:text-red-500 hover:underline   " onClick={()=>{
           deleteItem(product.product._id)
           setcountItems(countItems-1)
        
          
          }}
           
          ><i className='fas fa-trash sm:text-sm md:text-lg '></i>Remove</span>
        </td>
        </td >
       
        <td className="px-6 py-4">
          <div className="flex  items-center ">
            <button   onClick={()=>{
              updateProduct(product.product._id,product.count-1)
            }}         className="inline-flex items-center justify-center p-2 me-3 text-sm font-medium h-8 w-8 text-gray-500 bg-white border border-[#22DB14] rounded-md focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
             <span className='text-gray-900 text-xl'>{loadingCount && loadingId===product.product._id?<i className='fas fa-spinner fa-spin'></i>:product.count}</span>
            </div>
            <button  onClick={(()=>{
              updateProduct(product.product._id,product.count+1)
            })}
            className="inline-flex items-center justify-center h-8 w-8 p-2 ms-3 text-sm font-medium text-gray-500 bg-white border border-[#22DB14] rounded-md  focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
       
       
      </tr>)}
     

    </tbody>

    </table>

  <button className=' p-3 rounded-lg text-center bg-red-500 m-auto  flex items-center  text-white justify-center my-5 ' onClick={()=>{cartDelete()

}}>Delete all cart</button>
</div><></></>}


 


<>


</>

    
{/* {  cartempty?<>
     
    </>:null} */}
     
  


    </>



  
   
  )
}
