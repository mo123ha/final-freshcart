import React, { useContext, useState } from 'react'
import {  useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../UserContext/UserContext'


export default function Login() {
let{userLogin, setuserLogin}=useContext( UserContext)

  let navigate=useNavigate()
const [loading, setloading] = useState(false)
  const [apiError, setapiError] = useState(null)


  function handlelogin(values) {
   

    setloading(true)

   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
   .then((res)=>{
if(res.data.message=="success"){
  localStorage.setItem("usertoken",res.data.token)
  setuserLogin(res.data.token)
  console.log(res)
  setloading(false)
  navigate("/")
  
}
   }).catch((res)=>{

    setapiError(res.response.data.message)
    setloading(false)
    // console.log(res.response.data.message);
    
   })
    
    
  }

  let  validationSchema=Yup.object().shape({
   
    email:Yup.string().email().required("email is required"),
    
    password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,"password  should be between 6 and 10 char").required("password is required"),
  })
let formik=useFormik({
  initialValues:{
  
    email:"",
    
    password:"",
    

  },

 
   validationSchema: validationSchema,
     onSubmit:handlelogin,
})





  return (
    <>
    
    
<div className='my-5'>
<h1 className='my-3 text-center text-bold text-emerald-700 text-2xl'>Login now</h1>
{apiError? <h2 className='bg-red-500 my-5 rounded-lg text-center      w-1/4 mx-auto'   >{apiError}</h2>:null}
<form className=" mx-auto  py-5 w-[80%]"  onSubmit={formik.handleSubmit}>

  <div className="relative z-0 sm:w-full mb-5 group my-5">
      <input type="email" name="email"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
      id="email" 
      
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" "  />
      <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-500 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
      {formik.errors.email && formik.touched.email?<h3 className=" mb-4 text-sm text-red-800 " >
 {formik.errors.email}
</h3>:null}
  </div>

  <div className="relative z-0 w-full mb-5 group ">
      <input type="password" name="password"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.password}
      id="password" 
      
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" "  />
      <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">password</label>
      {formik.errors.password && formik.touched.password?<h3 className=" mb-4 text-sm text-red-800 " >
 {formik.errors.password}
</h3>:null}
  </div>

  <button type="submit" className="text-white bg-emerald-400 hover:bg-emerald-600focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">{loading?<i className='fas fa-spinner fa-spin'></i>:"Login"}


</button>
<div className='         md:flex md:justify-between items-center     '>
<div className='text-emerald-700    m-3'>
<Link  to="/register" >   <span className= 'sm:text-[10px] md:text-xl my-5 font-semibold'>you don't have any account? Resigter now:</span></Link>
 </div>
 <div className='text-emerald-700  m-3 flex'>
<Link  to="/forgetPassword" >   <span className=' sm:text-[10px]           md:text-xl my-5 font-semibold'>forget Password?</span></Link>
 </div>
</div>


  </form>



 
</div>

    
    
    
    



    </>

  )
}
