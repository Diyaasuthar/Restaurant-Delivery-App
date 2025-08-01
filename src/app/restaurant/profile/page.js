'use client'

import { useState, useEffect } from "react";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import { useRouter } from "next/navigation";

const RestaurantProfile = () => {
  const [restaurantData, setRestaurantData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadRestaurantProfile = async () => {
      try {
        const restaurantUser = localStorage.getItem("restaurantUser");
        if (!restaurantUser) {
          router.push("/restaurant");
          return;
        }

        const userData = JSON.parse(restaurantUser);
        setRestaurantData(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading restaurant profile:", error);
        setLoading(false);
      }
    };

    loadRestaurantProfile();
  }, [router]);

  if (loading) {
    return (
      <div>
        <RestaurantHeader />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading...</h2>
        </div>
        <RestaurantFooter />
      </div>
    );
  }

  if (!restaurantData) {
    return (
      <div>
        <RestaurantHeader />
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Restaurant data not found</h2>
        </div>
        <RestaurantFooter />
      </div>
    );
  }

  return (
    <div>
      <RestaurantHeader />
      <div className="profile-container">
        <div className="profile-card">
          <h1>Restaurant Profile</h1>
          
          <div className="profile-section">
            <h2>Restaurant Information</h2>
            <div className="profile-row">
              <span className="label">Restaurant Name:</span>
              <span className="value">{restaurantData.name}</span>
            </div>
            
            <div className="profile-row">
              <span className="label">Contact Number:</span>
              <span className="value">{restaurantData.contact}</span>
            </div>
            
            <div className="profile-row">
              <span className="label">Email:</span>
              <span className="value">{restaurantData.email}</span>
            </div>
            
            <div className="profile-row">
              <span className="label">City:</span>
              <span className="value">{restaurantData.city}</span>
            </div>
            
            <div className="profile-row">
              <span className="label">Address:</span>
              <span className="value">{restaurantData.address}</span>
            </div>
          </div>

          <div className="profile-actions">
            <button 
              onClick={() => router.push('/restaurant/dashboard')}
              className="back-button"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
      <RestaurantFooter />
    </div>
  );
};

export default RestaurantProfile; 