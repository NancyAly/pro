import React, { useContext, useEffect, useState } from 'react'
import styles from './WishList.module.css'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { WishListContext } from '../../Context/WishListContext'
import Loader from '../../components/Loader/Loader'
import { Spinner } from 'flowbite-react'
import WishListItem from '../../components/WishListItem/WishListItem'
export default function WishList() {
  
  const{ getWishList,wishList,loading,} = useContext(WishListContext)
  

  useEffect(() => {
     
    getWishList();
   }, []);
  
  return (
    <div>
      <Helmet>

        <title>WishList</title>

      </Helmet>

      <section className=' mx-auto'>
        {loading && <Spinner/>}
        
        
        
        <div className='m-10'>
          <h2 className='text-2xl font-semibold  border-bottom pb-2 mb-4'>My wish list</h2>
          <div className=' grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
          {wishList?.data?.data.length>0 ? wishList?.data?.data?.map((product)=>(
              <WishListItem product={product} key={product._id}/>
            )): "wish list empty" }

          </div>
        
        </div>

      </section>
     </div>

  )
}
