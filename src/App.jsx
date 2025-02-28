import { Children, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Layout from './Pages/Layout/Layout'
import Categories from './Pages/Categories/Categories'
import Login from './Pages/Login/Login'
import Products from './Pages/Products/Products'
import Cart from './Pages/Cart/Cart'
import Register from './Pages/Register/Register'
import Notfound from './Pages/Notfound/Notfound'
import Brands from './Pages/Brands/Brands'
import CounterContextProvider from './Context/CounterContext'
import TokenContextProvider from './Context/TokenContext'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import { Offline, Online } from 'react-detect-offline'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CheckOut from './Pages/CheckOut/CheckOut'
import AllOrders from './Pages/AllOrders/AllOrders'
import WishListContextProvider from './Context/WishListContext'
import WishList from './Pages/WishList/WishList'
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword'


export default function App() {
  const [count, setCount] = useState(0)
  const routes = createBrowserRouter([
    {
      path: "", element: <Layout />, children: [
        {
          index: true, element: (<ProtectedRoutes>
            <Home />{""}
          </ProtectedRoutes>),
        },
        {
          path: "categories", element: (<ProtectedRoutes>
            <Categories />
          </ProtectedRoutes>),
        },

        {
          path: "products", element: (<ProtectedRoutes>
            <Products />
          </ProtectedRoutes>),
        },
        {
          path: "cart", element: (<ProtectedRoutes>
            <Cart />
          </ProtectedRoutes>),
        },
        {
          path: "brands", element: (<ProtectedRoutes>
            <Brands />
          </ProtectedRoutes>),
        },
        {
          path: "wishlist", element: (<ProtectedRoutes>
            <WishList />
          </ProtectedRoutes>),
        },
        {
          path: "productdetails/:productId", element: (<ProtectedRoutes>
            <ProductDetails />
          </ProtectedRoutes>),
        },
        {
          path: "checkout", element: (<ProtectedRoutes>
            <CheckOut />
          </ProtectedRoutes>),
        },
        {
          path: "allorders", element: (<ProtectedRoutes>
            <AllOrders />
          </ProtectedRoutes>),
        },
        
        { path: "forgetpassword", element: <ForgetPassword/> },

        { path: "login", element: <Login /> },

        { path: "register", element: <Register /> },

        { path: "*", element: <Notfound /> }
      ],
    },
  ]);

  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <WishListContextProvider>

          <CartContextProvider>
            <CounterContextProvider>
              <Offline>
                {""}
                <div className="offline fixed bottom-2 right-4 bg-green-100 p-3 font-semibold rounded z-50">

                  <i class="fa-solid fa-wifi mx-3 text-xl"></i>
                  You Are Now Offline
                </div>
              </Offline>
              <Toaster position='bottom-right' />
              <ReactQueryDevtools initialIsOpen={false} />
              <RouterProvider router={routes}></RouterProvider>
            </CounterContextProvider>
          </CartContextProvider>
        </WishListContextProvider>
      </TokenContextProvider>
    </QueryClientProvider>


  );

}

