import { useQuery } from '@tanstack/react-query'
import React, { useEffect,useContext ,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useProducts from '../Hooks/useProducts';
import { CartContext } from './../UserContext/CartContext';
import { toast } from 'react-hot-toast';
import { WishList } from '../UserContext/WitshLIstContext';


export default function Products() {
  const [wish, setwish] = useState(
    localStorage.getItem('wish')? localStorage.getItem('wish'):null
  )
  const [loading, setloading] = useState(false)
  const [loadimgwishList, setloadimgwishList] = useState(false)
const [loadingWish, setloadingWish] = useState(false)
const [CurrentId, setCurrentId] = useState(0)
  let {addProductToCart}=useContext(CartContext)
  let { addToWishList,deleteWishListItem}=useContext(WishList)

  const [SearchContainer, setSearchContainer] = useState([])


  async function deleteFromwishLIst(id) {
    setloadimgwishList(true)
    let res= await deleteWishListItem(id)
    console.log(res);
    if (res.data.statusText=="OK") {
      setloadimgwishList(false)
  
      setwish(res.data.data)
      // console.log(res);
      
      // toast.success(res.data.message)
      
    }
    else{
      setloadimgwishList(false)

      toast.success(res.data.message)
    
      setwish(res.data.data)
      localStorage.setItem('wish',JSON.stringify (res.data.data));
  
    }
  
  
    
    
  }
  async function addToCart(id) {
  
    setloading(true)


    setCurrentId(id)
      let response= await  addProductToCart(id)
      console.log(response.data.data);
    
      if (response.data.status=="success") {
        setloading(false)
        // console.log(response.data.message);
        toast.success(response.data.message)

       
        
      }else{
        toast.error(response.data.message)
    
      }
    
      
    }
    async function AddToWish(id) {
      setloadimgwishList(true)
      setCurrentId(id)
      setloadingWish(true)
      let response= await addToWishList(id)
      if(response.data?.status=="success"){
        setloadimgwishList(false)
  setloading(false)
      console.log(response);
      setwish(response.data.data)
      toast.success(response.data.message)
      
      }
      else{
        setloadimgwishList(false)
        toast.success(response.data.message)
      }
    }
    
    function  search1(value){
      let val=value.toLowerCase()
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res)=>{
        let related= res.data.data.filter((product)=>product.title.toLowerCase().includes(val))
        setSearchContainer(related)
        console.log(related);
    
        
      })
      .catch((err)=>console.log(err)
      )
      
      // let response=await getSearchByName()
      // console.log(response);
      
      
    }

  let {data,isError,error,isLoading}=useProducts()
     // console.log(data);
     if (isLoading) {
       return <>
       
       <div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
<div>
<i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
</div>
</div>
       
if (isError) {
        
          <>
      
          <div className='border-red-600  text-white text-center p-5'>{error}</div>
          </>
          
        }
       </>
      
     }
  return (
 <>
{/* { loading && CurrentId ==product.id?(<i className='fas fa-spinner fa-spin'></i>) */}
<form  onKeyUp={(e)=>{search1(e.target.value)  }}       className="flex items-center  mx-auto  w-[75%] my-3"   >   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"/>
            </svg>
        </div>
        <input      type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
    </div>
  
</form>
 <div className='my-5 '>
 <div className="row gap-6  ">

{SearchContainer.length==0?<>{data.map((product)=><div  key={product.id} className='product   pb-2    sm:w-[46%]  md:w-[30%]     lg:w-[23%]   hover:shadow-lg hover:shadow-[#198754]'>


<Link to={`/productDetails/${product.id}/${product.category.name}`}><div className=' p-2'>
<img src={product.imageCover} alt="productImage" className='object-cover' />
<h3 className='text-emerald-300'>{product.category.name}</h3>
    <h3 className=''>{product.title.split(" ").slice(0,2).join(" ")}</h3>

    <div className='row justify-between'>
      <span>{product.price}EGP</span>
      <div className='row items-center'>
        <i className='fas fa-star text-yellow-200'></i>
        <span>{product.ratingsAverage}</span>
      </div>
    </div>
    
</div></Link>
<div className='row justify-end items-center me-2 text-lg  inline-block' onClick={()=>{
  wish?.includes(product?.id)?deleteFromwishLIst(product?.id):
    AddToWish(product?.id)
  
  
}}>


{loadimgwishList && CurrentId==product?.id?<> <div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
<div>
<i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
</div>
</div></>:      wish?.includes(product?.id)?<i className='fas fa-heart text-red-600 cursor-pointer'></i>:
     <i className='fas fa-heart cursor-pointer'></i>  }

 

 
</div>


<button   onClick={()=>{
  addToCart(product?.id)

}} className='bg-emerald-600 text-white p-1 rounded-lg text-center  w-[75%] btn   ms-4'>{ loading && CurrentId ==product.id?(<i className='fas fa-spinner fa-spin'></i>):<p><i className='fas fa-plus'></i> Add</p>}</button>
</div>)}</>:<>{SearchContainer?.map((product)=><div  key={product.id} className='product        sm:w-full md:w-1/2    lg:w-[23%]    hover:shadow-md hover:shadow-[#198754]'>


<Link to={`/productDetails/${product.id}/${product.category.name}`}><div className=' p-2'>
<img src={product.imageCover} alt="productImage" className='object-cover' />
<h3 className='text-emerald-300'>{product.category.name}</h3>
    <h3 className=''>{product.title.split(" ").slice(0,2).join(" ")}</h3>

    <div className='row justify-between'>
      <span  >{product.price}EGP</span>
      <div className='row items-center'>
        <i className='fas fa-star text-yellow-200'></i>
        <span>{product.ratingsAverage}</span>
      </div>
    </div>
   
</div></Link>
<div className='row justify-end items-center me-2 text-lg  inline-block' onClick={()=>{
  wish.includes(product?.id)?deleteFromwishLIst(product?.id):
    AddToWish(product?.id)
  
  
}}>


{loadimgwishList && CurrentId==product?.id?<> <div className='bg-[#00000055] fixed top-0 left-0 right-0 bottom-0   flex justify-center items-center'>
<div>
<i className='fas fa-spinner fa-spin  text-white text-5xl  text-center '></i>
</div>
</div></>:      wish?.includes(product?.id)?<i className='fas fa-heart text-red-600 cursor-pointer'></i>:
     <i className='fas fa-heart cursor-pointer'></i>  }

 

 
</div>

<div className='row justify-center '>
<button   onClick={()=>{
  addToCart(product?.id)

}} className='bg-emerald-600 text-white p-1 rounded-lg text-center  w-[75%] btn me-2'>{ loading && CurrentId ==product.id?(<i className='fas fa-spinner fa-spin'></i>):<p><i className='fas fa-plus'></i> Add</p>}</button>
</div>

</div>)}</>}




 
 </div>
</div>
 
 </>
  )
}



