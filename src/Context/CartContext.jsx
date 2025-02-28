import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext =createContext()
export default function CartContextProvider ({children}){
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [CartId, setCartId] = useState(null)
const headers={
    token:localStorage.getItem('token'),
}
function addToCart(id){
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
        productId:id
    },{headers,}).then((response)=>response.data).catch((err)=>err)
}
function getLoggedCartData(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
    headers,
})
    .then((response) => response.data)
    .catch((err) => err);
}
function removeCartItem (productId){
     return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        headers,
    }).then((response)=> response.data)
    .catch((err)=>err)
}
function clearCart(){
    return axios
    .delete("https://ecommerce.routemisr.com/api/v1/cart",{
        headers,
    })
    .then((response)=>response.data)
    .catch((err)=>err);
   
}
function onLinePayment(data){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:5174`,data,{headers,})
    .then((response)=>response).catch((err)=>err)

}
async function getData(){
    let response= await getLoggedCartData();
    setNumOfCartItems(response.numOfCartItems);
    setCartId(response.cartId)
}
function cashOnDelivery(data){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${CartId}`,data,{headers,})
    .then((response)=>response).catch((err)=>err)
}


async function getUserOrders(userId){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
    return data
}



useEffect(() => {
    getData();
}, []);


function updateProductQuantity (productId,count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
        count: count,
    },{
       headers,
   }).then((response)=> response.data)
   .catch((err)=>err)
}


    return <CartContext.Provider
     value={{addToCart,
     getLoggedCartData,
     removeCartItem,
     updateProductQuantity,
     clearCart,
     numOfCartItems,
     setNumOfCartItems,
     setCartId,
     cashOnDelivery,
     onLinePayment,getUserOrders}}>
        {children}</CartContext.Provider>
}