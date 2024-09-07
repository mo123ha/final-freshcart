import React , { useEffect, useState }from 'react'
import axios from'axios'
import Register from './../Register/Register';
import { Link } from 'react-router-dom';
import { logDOM } from '@testing-library/react';
// import Categories from './Categories';


export default function Categories() {
  const [Loading, setloading] = useState(false)
  const [Category, setCategory] = useState(null)
function getAllCategory() {
  setloading(true)
 axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
.then((res)=>{
if (res.statusText=="OK") {
  setloading(false)
  setCategory(res.data.data)
console.log(res);
}

  
})
.catch((res)=>{
  setloading(false)
  console.log(res);
  
})
}

function getSub() {
  axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/6407ebf65bbc6e43516931ec`)
.then((res)=>{
  console.log(res);
  
})
.catch((err)=>{
  console.log(err);
  
})
  
}

useEffect(()=>{

  getAllCategory()
  getSub()
},[])


  return (
<>

<div className='my-8 '>
  <div className='row  gap-6  sm:justify-center sm:items-center   md:justify-between '>
{Loading?<><div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
<div>
<i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
</div>
</div></>:  Category?.map((product)=>
  <div key={product._id} className=' sm:w-[100%]            md:w-[32%] border   border-gray-300 rounded-lg  hover:shadow-md hover:shadow-[#198754] '>
    <div >
    

     <div className='card-image '>
        <img src={product. image} className='h-[350px] object-cover w-full' alt="" />
      </div >
      <div className='card-content py-8 text-center font-bold text-[#198754]  '>
        <h1>{product.name}</h1>

      </div>
    
    </div>

  
</div>
)
  }  </div>
</div>
</>
  )
}


