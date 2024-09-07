
"use client";

import React ,{  useEffect,useState}from 'react'

import axios from 'axios'
// import Products from '../Products/Products'
import { Link, useParams } from 'react-router-dom';
// import { useMutationState } from '@tanstack/react-query';
import { Button, Modal } from 'flowbite-react';





export default function Brands() {
  // let {id}=useParams()
  // consol/e.log(id);
  const [openModal, setOpenModal] = useState(false);
const [brands, setbrands] = useState(null)
const [Loading, setloading] = useState(false)
const [idmodel, setidmodel] = useState(null)
const [model, setmodel] = useState(null)
  function getAllBrands() {
  setloading(true)
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>{

      if(res.statusText=  "OK"){
        setloading(false)
setbrands(res.data.data)
// console.log(res);

// setModelId((res.data.data._id))
        // console.log(res);
      }
      
    })
    .catch((res)=>{
      setloading(false)
      console.log(res);
      
    }) 
  }


  function getModelid(id) {
   
      axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)

      
      .then((res)=>{
        console.log(id);
        if(res.statusText=  "OK"){
          // setidmodel(res.data.data._id)
          // console.log();
    setmodel(res.data.data)
          console.log(res.data.data);
          
          // setModelId(res.data.data._id)

        }
      
        
        
      })
      .catch((res)=>{
        console.log(res);
        
      }) 
    
    }
  useEffect(()=>{
    getAllBrands()

  },[])
  return (
   <>

   <h1 className='my-10 text-center text-[#4FA74F]  text-5xl font-semibold'>All Brands</h1>
   <div className='my-8 '>
  <div className='row  gap-6   justify-center items-center '>

 {Loading?<>

<div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
<div>
<i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
</div>
</div>
 </>:
  brands?.map((Product)=>  <div  data-modal-target={idmodel} data-modal-toggle={idmodel} key={Product._id}  className=' sm:w-1/2    md:-w-1/3    lg:w-[23%] border   border-gray-300 rounded-lg  hover:shadow-md hover:shadow-[#198754]  transition-all-0.5s'>

 <div  onClick={() =>{ getModelid(Product._id)
   setOpenModal(true)}} >
  <div   className='card-image '   >
       <img src={Product.image} alt="brandsImage" />
     </div >
     <div className='card-content py-8 text-center '>
       <h1>{Product.name}</h1>

     </div>
 
    </div>

   
   


</div>)
 }


 

  </div>
</div>

  

  


      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body>
          <div className="space-y-6 flex justify-center items-center">
        
          <div className='w-[50%]  py-4'>

            <h1 className='text-3xl font-semibold text-[#4FA74F]'>{model?.name}</h1>
            <h4>{model?.slug}</h4>
          </div>
          <div className='w-[50%] bg-red-600'>
          <img src={model?.image} className='w-full bg-red-600' alt="" /> 
          </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)}>I accept</Button>
          <Button color="gray" onClick={() => setOpenModal(false)}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>






   </>
  )
  }



 
 
  