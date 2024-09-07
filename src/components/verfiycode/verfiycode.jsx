import React, { useContext, useState } from 'react'
import {  useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
// import   style from"./verfiycode.module.css"

export default function Verfiycode() {
let navigate=useNavigate()
const [loading, setloading] = useState(false)
  function handelverify(values) {
    setloading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
    .then((res)=>{
      if (res.data.statusMsg="success") {
        setloading(false)
        console.log(res);
        navigate("/updatePassword")
      }
      else{
        setloading(false)
        navigate("/verify")
        return
      }
    })
  
    // console.log(values);
    
    
  }


  let  validationSchema=Yup.object().shape({
   
    resetCode:Yup.string().min(5,"min  number 6").max(6,"max number 6").required("code is required"),
    

  })
  let formik=useFormik({
    initialValues:{
    
      resetCode:""
  
      
  
    },
  
   
     validationSchema: validationSchema,
       onSubmit:handelverify,
  })
  return (
    <>




<div className='bg-white shadow-md  my-10 py-20 flex flex-col justify-center items-center'>

  <h1 className='text-center my-5 text-gray-500  text-3xl  font-semibold me-4'>enter your verify code</h1>

  <form className=" w-[50%] mx-auto"  onSubmit={formik.handleSubmit}>
  <div>
            
            <input type="tel" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.resetCode}
            name='resetCode'
            
            id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="verfiy code" />
        </div>
        {formik.errors. resetCode && formik.touched. resetCode?<h3 className=" mb-4 text-sm text-red-800 " >
 {formik.errors. resetCode}
</h3>:null}
        <button type="submit" className= "my-5      text-white bg-emerald-400 hover:bg-emerald-600focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 ">
  {loading?<><div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
    <div>
    <i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
    </div>
    </div></>:"  reset"}


</button>
</form>



</div>

  
    </>
  )
}
