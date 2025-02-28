import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplaySpeed: 1000,
  autoplay: true
};
export default function ProductDetails() {
  const [count, setCount] = useState(0)
  const { productId } = useParams()
  const [details, setDetails] = useState({})
  const {addToCart,setNumOfCartItems,setCartId} = useContext(CartContext)
  const { addToWishList}=useContext(WishListContext)
  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
      .then((res) => setDetails(res.data.data))
      .catch((err) => console.log(err))
  }
  async function addProduct(id){
  let response = await addToCart(id);
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
    getProductDetails();
  }, [])

  return (
    <div className='row my-14 items-center'>
      <Helmet>

        <title>{details.title}</title>

      </Helmet>
      <div className="w-1/4 bg-red-100">
        <Slider {...settings}>
          {details.images?.map((img, i) =>
            <img src={img} alt="" key={i} />
          )}

        </Slider>
      </div>
      <div className="w-3/4 p-4">
        <div className="inner">
          <h2 className=' text-2xl font-semibold'>{details.title}</h2>
          <p className='text-gray-700 text-md my-4'>{details.description}</p>
          <p>{details.category?.name}</p>
          <div className="flex justify-between mt-4">
            <p>{details.price} EGP</p>
            <p><i className="fa-solid fa-star text-yellow-400 mx-2"></i>{details.ratingsAverage}</p>

          </div>
          <div className="btn w-full" onClick={()=>{addProduct(details.id)}}>Add To Cart</div>
          <i class="fa-solid fa-heart text-3xl"  onClick={()=>{addWishProduct(details.id)}}></i>
        </div>
      </div>
    </div>
  )
}
