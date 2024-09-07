import axios from 'axios'
import React from 'react'
import RecentProduct from './../RecentProduct/RecentProduct';
import NextSlider from './../NextSlider/NextSlider';
import FirstSlider from './../FirstSlider/FirstSlider';


export default function Home() {
  
  return (
 <>
<FirstSlider/>
 <NextSlider/>
 <RecentProduct/>
 </>
  )
}
