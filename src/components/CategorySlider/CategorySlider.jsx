import React, { useEffect, useState } from 'react'
import styles from './CategorySlider.module.css'
import axios, { Axios } from 'axios'
import Slider from 'react-slick';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]

};
export default function CategorySlider() {
    const[count,setCount]=useState(0)
    const [Categories, setCategories] = useState([])
    async function getCategories(){
      await axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((res)=>setCategories(res.data.data))
      .catch((error)=>console.log(error));
    }
    useEffect(() => {
      getCategories();
      
    }, [])
    
  return (
    <div className='my-4  mx-10'> <Slider {...settings}>
      {Categories.map((category)=>(
        <div key={category._id}>
          <img src={category.image} alt={category.name} className='w-full h-[400px]'/>
        <h3 className='font-semibold m-2'>{category.name}</h3>
      </div>
      )
      )}
    
   
  </Slider>
</div>
  )
}
