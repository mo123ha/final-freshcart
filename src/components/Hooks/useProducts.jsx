import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
// import   style from"./hooks.module.css"

export default function useProducts() {
  function getProduct() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)

     
     
     }

     
     let ProductInfo=useQuery({
       queryKey:["recentProduct"],
       queryFn:getProduct,
       select:(data)=>data?.data?.data
     })
     return ProductInfo
}
