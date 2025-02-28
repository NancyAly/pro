import React, { useContext, useEffect, useState } from 'react'

import LatestProducts from '../../components/LatestProducts/LatestProducts';
import CategorySlider from '../../components/CategorySlider/CategorySlider';
import MainSlider from '../../components/MainSlider/MainSlider';
import Loader from '../../components/Loader/Loader';
import { Helmet } from 'react-helmet';
export default function Home() {
    
  return (
    <div >
      <Helmet>     
         <title>HomePage</title>
       </Helmet>
       
      <MainSlider/>
      <CategorySlider/>
      <LatestProducts/>
    </div>
  )
}
