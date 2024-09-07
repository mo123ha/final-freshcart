import axios from "axios";
import { createContext} from "react";
// import WishList from './../WishList/WishList';
import Products from './../Products/Products';
import { useState ,useEffect} from "react";



export let WishList=createContext()



export function WishListProvider(props) {
    let headers={token:localStorage.getItem("usertoken")}

    const [countOfWish, setcountOfWish] = useState(0)

    function addToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId},{headers})
        .then((res)=>{
         
            
            return res
        })
        .catch((res)=>res)
        
    }

    function GetLoggedUserWish() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        .then((res)=>{
         setcountOfWish(res.data.count)
            // console.log();
            
            return res
        })
        .catch((res)=>res)
        
    }
    function deleteWishListItem(ProductId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${ProductId}`,{headers})
        .then((res)=>res)
        .catch((res)=>res)
        
    }





useEffect(()=>{
    GetLoggedUserWish()
},[])



    return<WishList.Provider value={{addToWishList,GetLoggedUserWish,deleteWishListItem,countOfWish,setcountOfWish}}>
        {props.children}
    </WishList.Provider>
    
}