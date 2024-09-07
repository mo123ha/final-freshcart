import React ,{  useState, useContext,useEffect }from 'react'

// import   style from"./wishList.module.css"
import { WishList } from './../UserContext/WitshLIstContext';
import { toast } from 'react-hot-toast';
import { CartContext } from './../UserContext/CartContext';
import Products from './../Products/Products';


export default function WishListContent(){
  let {GetLoggedUserWish,deleteWishListItem }=useContext(WishList)
const [wishDetails, setwishDetails] = useState(null)

const [loading, setloading] = useState(false)

const [loadingbtn, setloadingbtn] = useState(false)
const [CurrentId, setCurrentId] = useState(0)
const [removeid, setremoveid] = useState(null)
// let {addProductToCart}=useContext(CartContext)
let {addProductToCart,countItems,setcountItems}=useContext(CartContext)
 async function getLoggeWIsh() {

let response= await GetLoggedUserWish()

if (response.statusText= 'OK') {
  // setwishempty(false)
  

  setloading(false)
  console.log(response);
  setwishDetails(response.data.data)
  
}
  else{
    toast.error(response.data.message)
  }
}
async function addToCart(id) {
  setloading(true)
  
  setCurrentId(id)
    let response= await  addProductToCart(id)
    console.log(response.data.data);
  
    if (response?.data?.status=="success") {
      
      // console.log(response.data.message);
      toast.success(response.data.message)
      setloading(false)
      
    }else{
      toast.error(response.data.message)
  
    }
  
    
  }


async function deleteItem(ProductId) {

  setloadingbtn(true)
  setremoveid(ProductId)
  let response=await deleteWishListItem(ProductId)

  if (response?.data?.status=="success") {
    setloadingbtn(false)
    console.log(response);
    getLoggeWIsh(ProductId)
    localStorage.setItem('wish',JSON.stringify (response.data.data));
    // toast.success(response.data.message)
    // setwishDetails(response.data.data)
  }
  
}
 useEffect(()=>{

  getLoggeWIsh()
 },[])
  
  return (
    <>
    {/* { loading && CurrentId ==product.id? */}
{loading?<> <div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
<div>
<i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
</div>
</div> </>:null} <>   

{wishDetails?.length >0 ?<> <div   className='bg-gray-50 rounded-lg'>
  {wishDetails?.map((product)=><>  
  <div key={product.id}       className="relative overflow-x-auto my-10 sm:rounded-lg ">


<table       className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
    
    </tr>
  </thead>
  <tbody >
    <tr key={product._id} className="bg-gray-50 border-b  py-10  flex flex-wrap  md:flex-nowrap justify-center  items-center ">
      <td className="p-4  ">
        <img src={product.imageCover} className=" w-full h-[300px]   " alt="Apple Watch" />
      </td>
      <td className="px-6 py-8 font-semibold text-gray-900 flex flex-col w-[50%] justify-start items-start text-center p-2">
      <p className='my-3'> {product.title}</p>
        <p className='my-3 text-[#4FA74F]'>{product.price}EGP</p> 
        <span onClick={()=>{deleteItem(product.id) }}  className="font-medium text-red-600 cursor-pointer ">{loadingbtn&&removeid ==product.id?(<i className='fas fa-spinner fa-spin'></i>):
       <p> <i className='fas fa-trash'></i>remove</p>  } </span>
        {/* */}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
      
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white b">
      <button  className='border p-4 rounded-lg  border-[#4FA74F]' onClick={(()=>{
        
addToCart(product.id)
setcountItems(countItems+=1)
deleteItem(product.id)
      })}  >add to cart</button>
      </td>
    
    </tr>
  
    
  </tbody>
</table>
</div>

</>  ) }</div></>: <div className='bg-gray-50 h-[50x] py-20  my-8  '>
  <h1 className='text-4xl font-semibold ms-5'>My wish List</h1>

 
</div>}



</>
 
    
{/* {  wishempty?<>
     
    </>:null} */}



</>
  )
}
