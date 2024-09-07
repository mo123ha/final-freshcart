import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useEffect, useState, useContext } from 'react';
import { useParams ,Link} from 'react-router-dom'
import axios from 'axios'

import Slider from "react-slick";
// import   style from"./productDetails.module.css
import { CartContext } from './../UserContext/CartContext';
import { toast } from 'react-hot-toast';

export default function ProductDetails() {
  let {addProductToCart}=useContext(CartContext)
  let {id,category}=useParams()

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 100,
  };
  console.log(category);
  
  const [loading, setloading] = useState(false)
  const [product, setproduct] = useState(null)
  const [CurrentId, setCurrentId] = useState(0)
  const [relatedProducts, setrelatedProducts] = useState([])

  async function addToCart(id) {
    setloading(true)
    
    setCurrentId(id)
      let response= await  addProductToCart(id)
      console.log(response.data.data);
    
      if (response.data.status=="success") {
        
        // console.log(response.data.message);
        toast.success(response.data.message)
        setloading(false)
        
      }else{
        toast.error(response.data.message)
    
      }
    
      
    }

  function getproductDetails() {
    setloading(true)
axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
.then((res)=>{
  // console.log(res.data.data);
  setproduct(res.data.data)
  setloading(false)
})
    .catch((res)=>{

      setloading(false)

      
    })
  }
  function getALlproduct() {

    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
        // console.log(res.data.data);
        let related=  res.data.data.filter((product)=>product.category.name==category)
       
        setrelatedProducts(related)
        
    })
    .catch((res)=>{
        // console.log(res.data.data);
    })
    
}


 useEffect(()=>{
  getproductDetails(id)
  getALlproduct() 
 },[id,category])
  
  return (
<>

<div className=' sm:flex sm:flex-nowrap sm:justify-center sm:items-center md:row items-center p-4'>
{loading?<>  
  <div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
<div>
<i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
</div>
</div></>:<>
<div   key={product?.id} className=' sm:w-full md:w-1/4 object-cover'>
<Slider {...settings}>


  {product?.images.map((src)=>
  <img src={src} className='w-full' alt="" />
  
  )}
</Slider>
{/* <img src={product?.imageCover} alt="" /> */}

</div>
<div className='sm:w-full  md:w-3/4  p-4  '>
<h3 className='font-semibold sm:text-sm md:text-2xl '>{product?.title}</h3>
<h4 className='  text-gray-600 '>{product?.description}</h4>
<h4 className=' '>{product?.category.name}</h4>
<div className='flex justify-between items-center  my-7'>

<span>{product?.price}EGP</span>
<span><i className='fas fa-star text-yellow-200'></i>   {product?.ratingsAverage}</span>
</div>
<button onClick={()=>{addToCart(id)}}           className='btn bg-emerald-500 p-1 rounded-lg  w-full'>add to cart</button>

</div>
</>}

</div>

















<div className='  md:flex flex-wrap '>
  {relatedProducts.length>0?  relatedProducts.map((product)=>(
<div key={product.id}       className='sm:w-full md:w-1/2  lg:w-1/3  xl:w-1/6 my-5 m-3'> 
<div className='product'>
 
<Link to={`/productdetails/${product.id}/${product.category.name}`}>
<img src={product.imageCover}   className='w-full' alt="" />

  <h3 className='  text-emerald-400'>{product.category.name}</h3>
 <h3 className='font-semibold mb-3'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
 <div className='flex justify-between items-center p-3'>

     <span>{product.price}EGP</span>
     <span><i className='fas fa-star text-yellow-200'></i>   {product?.ratingsAverage}</span>
     </div>
</Link>

  </div>
  </div>





  )
):null}
</div>
</>
  )
}
