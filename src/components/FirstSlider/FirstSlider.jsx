import React from 'react'
import Slider from "react-slick";
// import   style from"./firstSlider.module.css"

export default function FirstSlider() {

  var settings = {
    dots:true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  
    speed: 2000,
  
  };
  return (

<>

    <div className='my-8 sm:row  w-[70%]  lg:flex flex-nowrap   justify-center items-center  mx-auto'>

<div className='lg:w-[50%]  sm:w-full'>
<Slider {...settings}>
  <img src="../../41nN4nvKaAL._AC_SY200_.jpg" className='h-[400px]  w-full  object-fill'   alt="slider1" />
  <img src="../../61cSNgtEISL._AC_SY200_.jpg" className='h-[400px]  w-full'   alt="slider1" />
</Slider>
</div>
   
<div className='lg:w-[30%] lg:my-0 sm:w-full  sm:my-5  '>
  <img src="../../XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg" className='h-[250px] '         alt="slider1" />
  <img src="../../XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg"  className='h-[250px]' alt="slider1" />
</div>
</div>
</>
  )
}
