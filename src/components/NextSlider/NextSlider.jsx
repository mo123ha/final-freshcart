
import Slider from "react-slick";
// import   style from"./nextSlider.module.css"
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function NextSlider() {
  const [Categories, setCategories] = useState([])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    speed: 100,
  };

  function getCategory() {



  
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
        // console.log(res.data.data);
        setCategories(res.data.data)
        
    })
    .catch((res)=>{
        // console.log(res.data.data);
    })
    
}

useEffect(()=>{
  getCategory()  
},[])
  return (
    <>
       <h2 className='my-4 text-gray-600 capitalize font-semiboldbold text-2xl'>shop populer Categories</h2>
    <Slider {...settings}>


{Categories.map((Category)=>
<div key={Category._id} className='my-8'>
<img src={Category.image}  className='sm:w-[20%] 
 md:w-full h-[250px] object-cover' alt="" />
<h4 className="font-bold  sm:tex-[2px] ">{Category.name}</h4>


</div>


)}


    </Slider>
    
    
    
    </>
  )
}
