import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from './pages/Home'
import Category from './pages/Category'
import Address from './pages/Address'
import WishList from './pages/WishList'
import Users from './pages/Users'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import ProductList from './pages/ProductList'

import Nav from './components/Nav'

import { ProductContextProvider } from './contexts/ProductContext'
import Order from './pages/Order'
import { UserContextProvider } from './contexts/UserContext'
import SearchResult from './pages/SeachResult'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <ProductContextProvider>
          <UserContextProvider>
            <Nav />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/products' element={<ProductList />} />
              <Route path='/products/:category' element={<Category />} />
              <Route path='/products/search/:value' element={<SearchResult/>}/>
              <Route path='/product/:id' element={<ProductDetails />} />
              <Route path='/wishlist' element={<WishList />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/cart/address/:id' element={<Address />} />
              <Route path='/users' element={<Users />} />
              <Route path='/cart/order' element={<Order />} />
            </Routes>
          </UserContextProvider>
        </ProductContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
