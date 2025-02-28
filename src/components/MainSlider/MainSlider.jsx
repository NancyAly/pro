import React, { useEffect, useState } from 'react'
import styles from './../MainSlider/MainSlider.module.css'
import image1 from './../../assets/Images/41nN4nvKaAL._AC_SY200_.jpg'
import image2 from'./../../assets/Images/61cSNgtEISL._AC_SY200_.jpg'
import image3 from'./../../assets/Images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import image4 from './../../assets/Images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import image5 from './../../assets/Images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'
import Slider from 'react-slick';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows:false,
};
export default function MainSlider() {
    const[count,setCount]=useState(0)
  return (
    <div className='row justify-center mt-7 '>
      <div className="w-1/4">
      <div className="slider-container slider1 ">
      <Slider {...settings} className='h-[400px] '>
        <div>
          <h3><img src={image1} className='w-full' alt="" /></h3>
        </div>
        <div>
          <h3><img src={image2}  className='w-full' alt="" /></h3>
        </div>
        <div>
          <h3><img src={image3} alt="" /></h3>
        </div>
       
      </Slider>
    </div>
      
      </div>
      <div className="w-1/4 ">
      <img src={image4} alt="" />
      <img src={image5} alt="" />
      </div>

    </div>
  )
}
