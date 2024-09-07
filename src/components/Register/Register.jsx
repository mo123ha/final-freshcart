import React, { useState,useContext } from 'react'
import {  useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import { UserContext } from './../UserContext/UserContext';

export default function Register() { 
  let{userLogin, setuserLogin}=useContext( UserContext)

  let navigate=useNavigate()
const [loading, setloading] = useState(false)
  const [apiError, setapiError] = useState(null)
  function handleRegister(values) {
   

    
    setloading(true)

    
   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
   .then((res)=>{

if(res.data.message="success"){
  localStorage.setItem("usertoken",res.data.token)
  console.log(res)
  setloading(false)
  setuserLogin(res.data.token)
  navigate("/login")
  
}
   }).catch((res)=>{

    setapiError(res.response.data.message)
    setloading(false)
    // console.log(res.response.data.message);
    



  })
    
    
  }

  let  validationSchema=Yup.object().shape({
    name:Yup.string().min(3,"min length is 3").max(15,"max length is 15").required("name is required"),
    email:Yup.string().email().required("email is required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone").required("phone is required"),
    password:Yup.string().matches(/^[A-Za-z0-9]{6,10}$/,"password  should be between 6 and 10 char").required("password is required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")],"password and repassword should be the same").required("rePassword is required")
  })
let formik=useFormik({
  initialValues:{
    name:"",
    email:"",
    phone:"",
    password:"",
    rePassword:"",

  },

 
   validationSchema: validationSchema,
     onSubmit:handleRegister,
})


  return (
    <>
    
    
<div className='my-5'>
<h1 className='my-3 text-center text-bold text-emerald-700 text-2xl'>Register now</h1>

{apiError? <h2 className='bg-red-500 my-5 rounded-lg text-center      w-1/4 mx-auto'   >{apiError}</h2>:null}
<form className=" mx-auto  py-5 w-[80%]"  onSubmit={formik.handleSubmit}>
  <div className="relative z-0 w-full mb-5 group">
      <input type="text" name="name"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.name}
      id="name" 
      
      className="block py-2.5 px-0 w-full text-sm text-grey-900  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" "  />
      <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>


 {formik.errors.name && formik.touched.name?<h3 className=" mb-4 text-sm text-red-800 " >
 {formik.errors.name}
</h3>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
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
  <div className="relative z-0 w-full mb-5 group">
      <input type="tel" name="phone"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.phone}
      id="phone" 
      
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" "  />
      <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
      {formik.errors.phone && formik.touched.phone?<h3 className=" mb-4 text-sm text-red-800 " >
 {formik.errors.phone}
</h3>:null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
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
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="rePassword"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.rePassword}
      id="rePassword" 
      
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" "  />
      <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">rePassword</label>
      {formik.errors.rePassword && formik.touched.rePassword?<h3 className=" mb-4 text-sm text-red-800 " >
 {formik.errors.rePassword}
</h3>:null}
  </div>
  <button type="submit" className="text-white bg-emerald-400     hover:bg-emerald-600focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">{loading?<i className='fas fa-spinner fa-spin'></i>:"Register"}


</button>
<div className='text-emerald-700 text-center m-3 font-semibold text-2xl'>
 <Link  to="/login" >   <span>do you  have  account? sign in</span></Link>
 </div>
  </form>

</div>

    
    
    
    
    
    </>
  )
}
