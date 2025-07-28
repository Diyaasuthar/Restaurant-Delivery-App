'use client'

import { useState } from "react";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import AddFoodItem from "@/app/_components/AddFoodItem";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import './../style.css';
import FoodItemList from "@/app/_components/FoodItemList";

const Dashboard = () => {
  const [addItem, setAddItem] = useState(false);

  return (
    <div>
      <RestaurantHeader />
      <div style={{ margin: "20px" }}>
        <button onClick={() => setAddItem(true)}>Add Food</button>
        <button onClick={() => setAddItem(false)}>Dashboard</button>
      </div>
      {addItem ? <AddFoodItem setAddItem={setAddItem}/> : <FoodItemList />}
      <RestaurantFooter />
    </div>
  );
};

export default Dashboard;
