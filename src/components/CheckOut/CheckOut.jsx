import React, { useContext, useState } from 'react'
import {  useFormik } from 'formik'

import axios from 'axios'

import { UserContext } from '../UserContext/UserContext'
// import Checkout from './CheckOut';
import { CartContext } from '../UserContext/CartContext';


export default function CheckOut() {


// let{userLogin, setuserLogin}=useContext( UserContext)
let{checkout,cartId}=useContext(CartContext)

let formik=useFormik({
  initialValues:{
  
  details:"",
  phone:"",
  city:""

  },

 
  
     onSubmit:()=>{handleCheckout(cartId,`http://localhost:3000`)},
})

 async function handleCheckout(cartId,url,values) {
   

    let {data}=await checkout(cartId,url,formik.values)

    window.location.href=data.session.url
  
    

 
  }







  return (
    <>
    
    
<div className='my-5'>



<h2 className='text-emerald-400 text-center font-semibold text-3xl my-5'>Checkout</h2>
<form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
  <div className="mb-5">
    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">details</label>
    <input type="text" id="details" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="details" required />
  </div>
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">phone</label>
    <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" required />
  </div>
  <div className="mb-5">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">city</label>
    <input type="text" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="city" required />
  </div>
  <button type="submit" className="text-white bg-emerald-400 hover:bg-emerald-600focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">checkout


</button>



  </form>



 
</div>

    
    
    
    



    </>

  )
}
