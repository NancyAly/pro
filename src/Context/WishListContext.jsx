import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishListContext =createContext()
export default function WishListContextProvider ({children}){
    
    const [wishList, setWishList] = useState(null)
    const[loading,setLoading]=useState(false)
    const headers={
    token:localStorage.getItem('token'),
}

async function getWishList(){
   try {
    
    setLoading(true)
    const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
        headers,},
    )
    setWishList(response)
   } catch (error) {
    return error
    
   } finally{
    setLoading(false)
   }
}
async function addTowishList(id){
    return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
        productId:id
    },{headers,}).then((response)=>response.data).catch((err)=>err)
}
async function removeFromWishList(productId){
    try{
        setLoading(true)
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers,})
        getWishList()
    } catch  (error){
       
        return error

    }
    finally{
        setLoading(false)
    }
   
}

    return <WishListContext.Provider
     value={{getWishList,
        addTowishList,
        removeFromWishList,
        wishList,
     loading,
}}>
        {children}</WishListContext.Provider>
}