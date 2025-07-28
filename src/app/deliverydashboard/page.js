'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DeliveryHearder from "../_components/deliveryHeader"; // make sure this path is correct

const Page = () => {
    const router = useRouter();
    const [myOrders, setMyOrders] = useState([]);

    // ✅ Check login and fetch orders
    useEffect(() => {
        const delivery = JSON.parse(localStorage.getItem("delivery"));
        if (!delivery) {
            router.push("/deliverypartner"); // redirect to login if not logged in
        } else {
            getMyOrders(delivery._id); // pass id to fetch orders
        }
    }, []);

    // ✅ Fetch delivery partner's assigned orders
    const getMyOrders = async (deliveryId) => {
        try {
            const res = await fetch(`/api/deliveryPartner/orders/${deliveryId}`);

            if (!res.ok) {
                const errorText = await res.text();
                console.error("Server error:", res.status, errorText);
                return;
            }

            const data = await res.json();
            if (data.success) {
                setMyOrders(data.result);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    return (
        <div>
            <DeliveryHearder />
            <h1 className="text-2xl font-bold p-4">My Order List</h1>
            {
                myOrders.length === 0 ? (
                    <div className="p-4">No orders assigned.</div>
                ) : (
                    myOrders.map((item, index) => (
                        <div key={index} className="restaurant-wrapper border p-4 m-2 shadow rounded">
                            <h4><strong>Name:</strong> {item.data?.name || 'N/A'}</h4>
                            <div><strong>Amount:</strong> ₹{item.amount}</div>
                            <div><strong>Address:</strong> {item.data?.address || 'N/A'}</div>
                            <div><strong>Status:</strong> {item.status}</div>
                            <div><strong>Update Status:</strong>
                                <select className="ml-2 p-1 border rounded">
                                    <option>Confirm</option>
                                    <option>On the way</option>
                                    <option>Delivered</option>
                                    <option>Failed to deliver</option>
                                </select>
                            </div>
                        </div>
                    ))
                )
            }
        </div>
    );
};

export default Page;
