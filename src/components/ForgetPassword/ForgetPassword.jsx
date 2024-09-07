import React, { useContext, useState } from 'react'
import {  useFormik } from 'formik'
import * as Yup from "yup"

import { Link, useNavigate } from 'react-router-dom'
import  axios from 'axios'
import { UserContext } from '../UserContext/UserContext'


export default function ForgetPassword() {
let{userLogin, setuserLogin}=useContext( UserContext)

  let navigate=useNavigate()
const [loading, setloading] = useState(false)
  const [apiError, setapiError] = useState(null)


  async function handlelogin(values) {
   setloading(true)
console.log(values);

    setloading(true)

   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
   .then((res)=>{
     setloading(false)
     if (res.data.statusMsg="success") {
  console.log(res);
  navigate("/verify")
}
  

   }).catch((res)=>{
setloading(false)
    setapiError(res.response.data.message)
    setloading(false)
    console.log(res.response.data.message);
    
   })
    
    
  }



  let  validationSchema=Yup.object().shape({
   
    email:Yup.string().email().required("email is required"),
    

  })
let formik=useFormik({
  initialValues:{
  
    email:"",

    

  },

 
   validationSchema: validationSchema,
     onSubmit:handlelogin,
})





  return (
    <>
    
    
<div className='my-5'>
<div className='bg-white shadow-md  my-10 py-20 flex flex-col justify-center items-center'>

  <h1 className='text-center text-black font-semibold text-2xl my-4
  '>Enter your Email</h1>
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

 

  <button type="submit" className="text-white bg-emerald-400 hover:bg-emerald-600focus:ring-4 
  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
   dark:bg-blue-600 dark:hover:bg-blue-700 ">{loading?<><div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
    <div>
    <i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
    </div>
    </div></>:"Submit"}


</button>



  </form>
</div>




 
</div>

    
    
    
    



    </>

  )
}