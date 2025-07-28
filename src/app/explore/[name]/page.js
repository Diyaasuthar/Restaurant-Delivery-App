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
  const [cartData,setCartData]=useState(null);
  const [cartStorage,setCartStorage]=useState(JSON.parse(localStorage.getItem('cart')));
  const [cartIds,setCartIds]=useState(cartStorage?()=>cartStorage.map((item)=>{
    return item._id
  }):[]);
  const [removeCartData,setRemoveCartData]=useState()

  useEffect(() => {
    if (id) {
      loadRestaurantDetails(id);
    }
  }, [id]);

 
  

  const loadRestaurantDetails = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/customer/${id}`);
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
    setCartData(item);
    let localCartIds = cartIds;
    localCartIds.push(item._id);
    setCartIds(localCartIds);
    setRemoveCartData();
  }

  const removeFromCart=(id)=>{
    setRemoveCartData(id);
    var localIds=cartIds.filter(item=>item!=id);
    setCartData()
    setCartIds(localIds)
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
           foodItems.length>0? foodItems.map((item,index)=>(
                <div key={index} className="list-item">
                    <div><img style={{width:100}} src={item.path} /></div>
                    <div>
                        <div>{item.name}</div>
                       <div>{item.price}</div>
                       <div className="description">{item.description}</div>
                       {
                           cartIds.includes(item._id) ?  <button onClick={()=>removeFromCart(item._id)}>Remove From Cart</button>
                           :  <button onClick={()=>addToCart(item)}>Add to Cart</button>
                       }
                        
                     
                    </div>
                </div>
            )):
            <h1>No Food Items Added For Now</h1>
        }
      </div>
      <RestaurantFooter />
    </div>
  );
};

export default Page;
