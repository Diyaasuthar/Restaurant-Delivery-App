'use client'

import { useEffect, useState } from "react";
import CustomerHearder from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";

const Page = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [userStorage, setUserStorage] = useState(null);

    useEffect(() => {
        // Only access localStorage on the client side
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            setUserStorage(user);
            if (user) {
                getMyOrder(user);
            }
        }
    }, []);

    const getMyOrder = async (user) => {
        if (!user) return;
        
        let response = await fetch('http://localhost:3000/api/order?id=' + user._id);
        response = await response.json();
        if (response.success) {
            setMyOrders(response.result)
        }
    }

    // Show loading state while data is being loaded
    if (typeof window === 'undefined' || !userStorage) {
        return (
            <div>
                <CustomerHearder />
                <div style={{ textAlign: 'center', padding: '50px' }}>
                    <h2>Loading...</h2>
                </div>
                <RestaurantFooter />
            </div>
        );
    }

    return (
        <div>
            <CustomerHearder />
            {
                myOrders.map((item, index) => (
                    <div key={index} className="restaurant-wrapper" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <h4>{item.data.name}</h4>
                        <div>Amount : {item.amount}</div>
                        <div>Address : {item.data.address}</div>
                        <div>Status : {item.status}</div>
                    </div>
                ))
            }
            <RestaurantFooter />
        </div>
    )
}

export default Page;