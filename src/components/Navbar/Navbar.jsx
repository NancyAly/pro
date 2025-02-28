import React, { useContext, useEffect, useState } from 'react'
import styles from './Navbar.module.css'
import logo from './../../assets/Images/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'
import { tokenContext } from '../../Context/TokenContext'
import { CartContext } from '../../Context/CartContext'
export default function Navbar() {
  const {numOfCartItems} = useContext(CartContext)
  const {token,setToken}= useContext(tokenContext);
 const navigate= useNavigate()
  

  function logoutUser(){
    localStorage.removeItem("token");
    setToken(null);
    navigate('/login');
  }
  return (


    <nav className="bg-gray-100 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center gap-4">
          <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} width={'200px'} className="h-8" alt="Flowbite Logo" />

          </a>
          {token && (<div className="hidden w-full md:block md:w-auto bg-gray-100" id="navbar-default">
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-200 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-gray-100 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to={''} className="block py-2 px-3   rounded-sm    dark:text-white md:dark:text-green-500" aria-current="page">Home </NavLink>
              </li>
              <li>
                <NavLink to={'cart'} className="block py-2 px-3 text-green-900 rounded-sm   md:border-0 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart</NavLink>
              </li>
              <li>
                <NavLink to={'wishlist'} className="block py-2 px-3 text-green-900 rounded-sm   md:border-0 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">wish list</NavLink>
              </li>
              <li>
                <NavLink to ={'products'} className="block py-2 px-3 text-green-900 rounded-sm   md:border-0 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Products</NavLink>
              </li>
              <li>
                <NavLink to={'categories'} className="block py-2 px-3 text-green-900 rounded-sm   md:border-0 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</NavLink>
              </li>
              <li>
                < NavLink to={'brands'} className="block py-2 px-3 text-green-900 rounded-sm  md:border-0 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
              </li>
            </ul>
          </div>)}
        </div>
        <div className="flex">
          <ul className='flex gap-4'>
            <li>
              <i className='fa-brands fa-instagram'></i>
            </li>
            <li>
              <i className='fa-brands fa-facebook'></i>
            </li>
            <li>
              <i className='fa-brands fa-tiktok'></i>
            </li>
            <li>
              <i className='fa-brands fa-twitter'></i>
            </li>
            <li>
            <i className="fa-brands fa-linkedin"></i>
            </li>
            <li>
              <i className='fa-brands fa-youtube'></i>
            </li>
            
            {token && (<>
              <li>
            <NavLink to={'cart'} className=" relative block py-2 px-3 text-green-900 rounded-sm   md:border-0 md:p-0 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
            <i className="fa-solid fa-cart-shopping font-semibold text-l"></i>
            <span className='absolute -top-3 -right-4 w-5 h-5 rounded-full flex justify-center items-center bg-green-400'>{numOfCartItems}</span>
            </NavLink>
          </li>
              <li>
              <span className="cursor-pointer" onClick={logoutUser}>Signout</span>
            </li>
           
          </>
          )}
            {!token && (
              <>
            <li>
              <NavLink to={'register'}>Register</NavLink>
            </li>

            <li>
              <NavLink to={'login'}>Login</NavLink>
            </li>
            </>
            )}

          </ul>
          
            

          
        </div>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

      </div>
    </nav>


  )
}
