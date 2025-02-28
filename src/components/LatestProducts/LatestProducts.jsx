import React, { useContext, useEffect, useState } from 'react'
import styles from './LatestProducts.module.css'
import axios from 'axios';
import ProductItem from '../ProductItem/ProductItem';
import Loader from '../Loader/Loader';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
export default function LatestProducts() {
    const[count,setCount]=useState(0)
    const [products, setProducts] = useState([])
    const {addToCart,setNumOfCartItems, setCartId}= useContext(CartContext)
   const{addToWishList}= useContext(WishListContext)
    async function getProducts(){
       await axios.get('https://ecommerce.routemisr.com/api/v1/products').then((res)=>{
        setProducts(res.data.data);
      }).catch((error)=>{
        console.log(error);
      })
    } 

    async function addWishProduct(id){
      let response= await addToWishList(id);
      if(response.status==='success'){
         setCartId(response.cartId)
       toast.success(response.message,{
         style:{
           fontWeight:600
         }
       })
     }
     else{
       toast.error('something wrong',{
         style:{
           fontWeight:600
         },
       })
     }
     }
    useEffect(() => {
  
    
     getProducts()
    }, [])
    async function addProduct(id){
      let response = await addToCart(id);
      console.log(response)
      

      if(response.status==='success'){
        setNumOfCartItems(response.numOfCartItems);
      setCartId(response.cartId)
        toast.success(response.message,{
          style:{
            fontWeight:600
          }
        })
      }
      else{
        toast.error('something wrong',{
          style:{
            fontWeight:600
          },
        })
      }
      }
    
    return (
    <div className='row justify-center'>  
      {products.length>0 ? products.map((product)=>(
        <div className=' p-2  w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6' key={product.id}>
          
         <ProductItem product={product} addProduct={addProduct} addWishProduct={addWishProduct}/>

        </div>
      )):
      <Loader/>
      }
    </div>
  )
}
