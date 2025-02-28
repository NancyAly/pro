import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../components/Loader/Loader';
import CategoryItem from '../../components/CategoryItem/CategoryItem';
export default function Categories() {


  function getCategories() {
    return  axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const {data,isLoading,isFetching} = useQuery({
    queryKey:["categories"],
    queryFn: getCategories,
    refetchInterval:1000
  });
 
  
  return (
    <div>
    <Helmet>
      <title>Categories</title>
    </Helmet>
    <div className="row justify-start">
      {isLoading && <Loader/>}
      {data?.data?.data.map((category, i) => (
        <div className='p-6 w-full   md:w-1/3 ' key={i}>
          <div className='border border-5'>
            <img className='w-[100%] h-[400px]' src={category.image} alt="" />
            <h4 className='text-2xl font-semibold p-3'>{category.name}</h4>
          </div>
        </div>
        
      ))}
      </div>
      {/* <CategoryItem/> */}
      </div>
  )
 
  

  
  
      
}
