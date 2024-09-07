import { createContext ,useState,useEffect} from"react";
// import Products from './../Products/Products';


import axios from 'axios'


export let CartContext=createContext()




export default function CartContextProvider(props) {
const [cartId, setcartId] = useState(0)

    const [countItems, setcountItems] = useState(0)

let headers={token:localStorage.getItem("usertoken")}

function addProductToCart(productId) {

    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:productId},{headers})
.then((res)=>{

    return res
})
.catch((res)=>res)
    
}


function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((res)=>{
        console.log(res.data.data._id);
        setcartId(res.data.data._id)
        setcountItems(res.data.numOfCartItems)
        return res})
    .catch((res)=>res)
}


 function updateCartProductQuantity(productId,newCount) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newCount},{headers})
    .then((res)=>res)
    .catch((res)=>res)
 }

 function deleteCartItem(productId) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
    .then((res)=>res)
    .catch((res)=>res)
 }

 function deleteAllCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
    .then((res)=>res)
    .catch((res)=>res)
 }


 function checkout(cardId,url,formData) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}`,{shippingAddress:formData},{headers})
    .then((res)=>res)
    .catch((res)=>res)
 }
 useEffect(()=>{
    getLoggedUserCart()

 },[])
    return <CartContext.Provider value={{countItems,setcountItems,deleteAllCart,addProductToCart,updateCartProductQuantity,deleteCartItem,getLoggedUserCart,checkout,cartId}}>
        {props.children}
    </CartContext.Provider>
    
}




 