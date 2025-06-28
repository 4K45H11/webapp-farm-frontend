import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";

//importing the images

import allProductsImg from '../resources/allProducts.png';
import lessonsFarmImg from '../resources/lessonsFarm.png';
import guestHouseImg from '../resources/guestHouse.png';

const ProductContext = createContext();

const useProductContext = () => useContext(ProductContext);
export default useProductContext;

const categories = [
  'All Products', 'vegetables', 'fish', 'eggs', 'milk products', 'fruits',
  'byproducts', 'flowers', 'ration', 'handicrafts', 'saplings', 'sweet & snacks'
];

const features = [
  {
    id: 1,
    title: 'Harvest on your own',
    feat: 'Pluck your own fruits and vegetables by coming to our farm.',
    imgUrl: allProductsImg
  },
  {
    id: 2,
    title: 'Learn basics of farming',
    feat: 'Farming lessons for beginners',
    imgUrl:lessonsFarmImg
  },
  {
    id: 3,
    title: 'Agro tourism',
    feat: 'Enjoy stay in our farm guest house and authentic Bengali cuisines',
    imgUrl: guestHouseImg
  }
];

const ratings = [
  { id: 3, rating: 3 },
  { id: 4, rating: 4 },
];

export const ProductContextProvider = ({ children }) => {
  const { data, loading, error } = useFetch(`https://farm-webapp-backend.vercel.app/products/all`);

  const [agriProducts, setAgriProducts] = useState([]);
  
  const [quantity, setQuantity] = useState({});

  // const [cartItems ,setCartItems] = useState(agriProducts.filter(p => p.inCart))

  useEffect(() => {
    if (data?.products) {
      setAgriProducts(data.products);
      const initialQuantities = {};
      data.products.forEach(i => {
        initialQuantities[i.itemId] = 1;
      });
      setQuantity(initialQuantities);
    }
  }, [data]);

  // Cart
  const addToCartButton = (productId) => {

    return setAgriProducts(prev =>
      prev.map(p => p.itemId !== productId ? p : { ...p, inCart: true, inWishlist: false })
    );
  };

  const removeFromCartButton = (productId) => {
    return setAgriProducts(prev =>
      prev.map(p => p.itemId !== productId ? p : { ...p, inCart: false })
    );
  };

  // Wishlist
  const addToWishlistButton = (productId) => {
    return setAgriProducts(prev =>
      prev.map(p => p.itemId !== productId ? p : { ...p, inWishlist: true })
    );
  };

  const moveToWishlist = (productId) => {
    return setAgriProducts(prev =>
      prev.map(p => p.itemId !== productId ? p : { ...p, inWishlist: true, inCart: false })
    );
  };

  const removeFromWishlistButton = (productId) => {
    return setAgriProducts(prev =>
      prev.map(p => p.itemId !== productId ? p : { ...p, inWishlist: false })
    );
  };

  // Quantity
  const handleAddQuantity = (productId) => {
    setQuantity(prev => ({
      ...prev,
      [productId]: (prev[productId] || 1) + 1
    }));
  };

  const handleMinusQuantity = (productId) => {
    setQuantity(prev => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1
    }));
  };

  const navigate = useNavigate();
  const itemDetails = (id) => navigate(`/product/${id}`);

  return (
    <ProductContext.Provider value={{
      categories, features, ratings, agriProducts,loading,error, itemDetails,
      quantity, handleAddQuantity, handleMinusQuantity,
      addToCartButton, removeFromCartButton,
      addToWishlistButton, removeFromWishlistButton, moveToWishlist,setAgriProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};
