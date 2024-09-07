// import React,{useEffect,useState} from 'react'

// // import   style from"./allOrders.module.css"
// import  axios  from 'axios';
// import Products from './../Products/Products';


// export default function AllOrders() {

//   // 66ccce85aed51dbc6284d855
//   const [loadind, setloadind] = useState(false)
// const [allorders, setallorders] = useState([])
// function getUserproducts() {
//   setloadind(true)
//   axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/6407cf6f515bdcf347c09f17`)

//   .then((res)=>{
//     if (res.statusText=="OK") {

//       setloadind(false)
//       console.log(res.data);
//       setallorders(res.data)
    
    
//     }
    
//   }).catch((res)=>{
//     setloadind(false)
//     console.log(res);
    
//   })
  
// }

// useEffect(()=>{
//   getUserproducts()
// },[])
// return(<>




// {loadind?<div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
// <div>
// <i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
// </div>
// </div>:<div className='flex flex-wrap justify-between items-center g-3'>
// {allorders?.map((pro)=>
//   <div  key={pro?.id} className='sm:w-full  md:w-[30%] h-[30%]  mb-3 '>
//       <div key={pro?.id} className='content bg-blue-400 text-white p-3'  >


//         <div>
//           {pro.cartItems.map((product)=> ( 
//             <>
//              <div className='flex justify-center items-center my-5'> 
//           <img src={product.product.imageCover} alt=" allOrdess"  className=' :w-[50%] h-[200px] mt-5'/>
//           </div>
//                   <p className=''> <span className='text-black'>Count:</span>{product.count}</p>
//                   <p className=''> <span className='text-black'>ProductId:</span>{product.product.id}</p>
//                   </>
//          ) )}
//         </div>

//         <div className='flex flex-wrap justify-between items-center'>
//         {/* <h1> <span className='text-black'>Amount :</span>{pro.cartItems.map((cart)=> cart.count)}</h1> */}
//         <h1> <span className='text-black'>totalPrice:</span>{pro.totalOrderPrice}</h1>
//         </div>
//       <h1> <span className='text-black'>paymentmethod:</span> {pro.
// paymentMethodType}</h1>

//       <p> <span className='text-black'>City:</span>{pro.shippingAddress?.city}</p>
//       <div className='flex justify-between items-center'>
//         <p ><span className='text-black'>Name:</span>{pro.user.name}</p>
       

//         <p><span className='text-black'>Phone:</span>{pro.user.phone}</p>

//       </div>

//     </div>

// </div>
// )}
// </div>
// }







// </>)






//   }



import React from 'react'

export default function AllOrders() {
  return (
   <>
 <div className='row justify-center items-center  h-screen '>
 <div className=' bg-emerald-700 py-10 text-white shadow-md  text-center w-[50%] sm:text-sm md:text-lg font-semibold'>
     <h1>
      Your order is done
     </h1>
     <p>order will arrive at 7 day</p>

     <span> thank  you for chossing  our service and we hope to live up to your trust</span>
   </div>
 </div>
   
   
   </>
  )
}
