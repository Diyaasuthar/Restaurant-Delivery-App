'use client'

import { useEffect, useState } from "react";
import CustomerHearder from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const Page = ()=>{

    const [myOrders,setMyOrders]=useState([]);
    useEffect(()=>{
       getMyOrder()
    },[])

    const getMyOrder=async()=>{
        const userStorage = JSON.parse(localStorage.getItem('user'));
        let response = await fetch('http://localhost:3000/api/order?id='+userStorage._id);
        response = await response.json();
        if(response.success){
            setMyOrders(response.result)
        }
    }
        

    return(
        <div>
            <CustomerHearder />
            {
                myOrders.map((item)=>(<div className="restaurant-wrapper" style={{marginLeft:'auto',marginRight:'auto'}}>
                     <h4>{item.data.name}</h4>
                     <div>Amount : {item.amount}</div>
                     <div>Address : {item.data.address}</div>
                     <div>Status : {item.status}</div>
                </div>))
            }
            <RestaurantFooter />
        </div>
    )
}

export default Page;