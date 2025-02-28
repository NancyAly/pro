import React, { useEffect, useState } from 'react'
import styles from './ProductItem.module.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { WishListContext } from '../../Context/WishListContext';
export default function ProductItem({product,addProduct,addWishProduct}) {
  
  const {addTowishList,wishList,setWishlist,getWishList} = useContext(WishListContext)

 function handleAddTowishList(e,productId) {
  e.preventDefault()
  addTowishList(productId)

}
   
  return (
    <div className="inner product p-2 border border-transparent rounded-md">
      <Link to={`./productdetails/${product.id}`}>
      <img src={product.imageCover} alt="" className='w-full' />
      <small className='text-main'> {ProductItem.category?.name }</small>
      <h5 className='font-semibold my-3'>
        {product.title.split(" ").slice(0,3).join(" ")}

      </h5>
      <div className="flex justify-between">
        <p>{product.price} EGP</p>
        <p><i className="fa-solid fa-star text-yellow-400 mx-1"></i>{product.ratingsAverage}</p>

      </div>
      </Link>
      <div className="flex justify-around">
      <div className='btn ' onClick={()=>{addProduct(product.id)}}>Add To Cart</div>
      
      
      <i class=" fa-solid fa-heart text-3xl text-red  text-black " onClick={(e)=> handleAddTowishList(e,product.id)}></i>
      </div>

    </div>
  )
}
