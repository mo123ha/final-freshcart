import React, { useContext, useState } from 'react'
import {  useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { logDOM } from '@testing-library/react'

export default function UpdatePassword() {
  let Navigate=useNavigate()
  const [apierror, setapierror] = useState(null)
    // let headers={token:localStorage.getItem("usertoken")}
    function handelUpdatePassword(values) {
        // console.log(values);
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
         
    .then((res)=>{
      if(res.data.statusText='OK'){
// localStorage.setItem("usertoken",res.data.token)


Navigate("/login")
        console.log(res);
        
      }
// console\log(res.data.statusText="OK");


              
              
        
            
        }).catch((err)=>{

          console.log(err);
          
      // if (err.response.statusText="Bad Request") {
        // setapierror(err.response.data.message)
        // console.log(err.response.data.message);
      // }
            
            
        })
        
        
        
    }
    let  validationSchema=Yup.object().shape({
      
      email  :Yup.string().email().required("email is required"),
      newPassword:Yup.string().matches(/^[A-Za-z][A-Za-z0-9]{6,10}$/,
           " must start with a lower or large char a-z, password  should be between 6 and 10 char").required("password is required"),
        
      })
    let formik=useFormik({
       initialValues:{
      email:"",
       newPassword:"",
   
       },

       validationSchema:validationSchema,
       onSubmit:handelUpdatePassword,
    }

)
  return (
    <>
    <div className='bg-white shadow-md  my-10 py-20 flex flex-col justify-center items-center'>


{apierror?<><div className='bg-red-400  mb-4 p-3 rounded-md'> <h2>{apierror}</h2> </div></>:null}

    <form className='w-[70%]' onSubmit={formik.handleSubmit}>
  
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
      id="email" 
      
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" "  />
      <label htmlFor="email" className="  peer-focus:font-medium absolute  text-emerald-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email</label>
      {formik.errors.email && formik.touched.email?<div className=''>
        <h3 className=" mb-4 text-sm text-red-800 " >
       {formik.errors.email}
      </h3>
      </div>
      :null}
     
  </div>       
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="newPassword"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.newPassword}
      id="newPassword" 
      
      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-slate-500 focus:outline-none focus:ring-0 focus:border-slate-600 peer" placeholder=" "  />
      <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-emerald-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword</label>
      {formik.errors.newPassword && formik.touched.newPassword?<h3 className=" mb-4 text-sm text-red-800 " >
 {formik.errors.newPassword}
</h3>:null}
  </div>

  <button type="submit" className= "my-5      text-white bg-emerald-400 hover:bg-emerald-600focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
    reset


</button>
    </form>

    </div>
    </>
   
  )
}
