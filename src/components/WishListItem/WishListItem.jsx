import React, {  useContext, useEffect, useState } from 'react'
import styles from './WishListItem.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { WishListContext } from '../../Context/WishListContext'
export default function WishListItem({product}) {
    const[count,setCount]=useState(0)
   const {addToCart,setNumOfCartItems, setCartId}= useContext(CartContext)
    const{ getWishList,wishList,loading,removeFromWishList} = useContext(WishListContext)
   const [products, setProducts] = useState([])
    function handleRemove (e){
      e.preventDefault();
      removeFromWishList(product._id)

    }
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
    <div>
       
        <Link className='flex flex-col items-center g-3 border rounded-sm p-2 h-full'>
        <div className='w-full'>
          <img  className="w-full" src={product.imageCover} alt="" />
        </div>
        <div className='flex flex-col flex-grow-1'>
          <h4>
            {""}
            {product.title.split(" ").length>3
            ? `${product.title.split(" ").slice(0,3).join(" ")}...`
          :product.title
          }
          </h4>
          <small>
            {product.description.split(" ").length> 4
            ?`${product.description.split(" ").slice(0,4).join(" ")}...`
            :product.description
          }
          </small>
          <div className='btn ' onClick={addProduct}>Add To Cart</div>
          <button className=' btn' onClick={handleRemove}>Remove</button>

        </div>
        </Link>
      
    </div>
  )
}
