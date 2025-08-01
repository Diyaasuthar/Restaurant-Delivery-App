'use client'

import CustomerHearder from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from 'next/navigation';

const Page = () => {
  const params = useParams(); 
  const searchParams = useSearchParams();

  const name = params.name;
  const id = searchParams.get('id');

  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [foodItems, setFoodItems] = useState([]); // ✅ default to empty array
  const [cartData, setCartData] = useState(null);
  const [cartStorage, setCartStorage] = useState([]);
  const [cartIds, setCartIds] = useState([]);
  const [removeCartData, setRemoveCartData] = useState();

  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartStorage(cart);
      // Get unique IDs from cart to avoid duplicates
      const uniqueIds = [...new Set(cart.map((item) => item._id))];
      setCartIds(uniqueIds);
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadRestaurantDetails(id);
    }
  }, [id]);

  const loadRestaurantDetails = async (id) => {
    try {
      const res = await fetch(`/api/customer/${id}`);
      const data = await res.json();
      console.log("✅ API Response:", data);

      if (data.success && data.details) {
        setRestaurantDetails(data.details);
        setFoodItems(Array.isArray(data.foodItems) ? data.foodItems : []); // ✅ array check
      } else {
        console.error("❌ API error:", data);
        setFoodItems([]); // prevent undefined crash
      }
    } catch (error) {
      console.error("❌ Fetch failed:", error);
      setFoodItems([]); // fallback
    }
  };

  const addToCart = (item) => {
    // Check if user is logged in
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
    if (!user) {
      alert('Please login or signup to add items to cart.');
      window.location.href = '/user-auth';
      return;
    }
    
    // Check if item already exists in cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(cartItem => cartItem._id === item._id);
    
    if (existingItemIndex !== -1) {
      // Item exists, increment quantity
      existingCart[existingItemIndex].quantity = (existingCart[existingItemIndex].quantity || 1) + 1;
    } else {
      // Item doesn't exist, add with quantity 1
      existingCart.push({ ...item, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(existingCart));
    setCartData(item);
    // Update cartIds with unique IDs only
    const uniqueIds = [...new Set(existingCart.map((item) => item._id))];
    setCartIds(uniqueIds);
    setRemoveCartData();
  }

  const removeFromCart = (id) => {
    if (typeof window === 'undefined') return;
    
    // Remove item from cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = existingCart.filter(item => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    setRemoveCartData(id);
    setCartData();
    
    // Update cartIds with unique IDs only
    const uniqueIds = [...new Set(updatedCart.map((item) => item._id))];
    setCartIds(uniqueIds);
  }

  // Show loading state while data is being loaded
  if (typeof window === 'undefined') {
    return (
      <div>
        <CustomerHearder cartData={cartData} removeCartData={removeCartData} />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading...</h2>
        </div>
        <RestaurantFooter />
      </div>
    );
  }

  return (
    <div>
      <CustomerHearder cartData={cartData} removeCartData={removeCartData} />

      <div className='restaurant-page-banner'>
        <h1>{decodeURI(name)}</h1>
      </div>

      <div className="details-wrapper">
        <h4>Contact: {restaurantDetails?.contact}</h4>
        <h4>City: {restaurantDetails?.city}</h4>
        <h4>Address: {restaurantDetails?.address}</h4>
        <h4>Email: {restaurantDetails?.email}</h4>
      </div>
      <div className="food-item-wrapper">
        {
          foodItems.length > 0 ? foodItems.map((item, index) => (
            <div key={index} className="list-item">
              <div><img style={{ width: 100 }} src={item.path} /></div>
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                {
                  cartIds.includes(item._id) ? <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>
                    : <button onClick={() => addToCart(item)}>Add to Cart</button>
                }
              </div>
            </div>
          )) :
            <h1>No Food Items Added For Now</h1>
        }
      </div>
      <RestaurantFooter />
    </div>
  );
};

export default Page;
