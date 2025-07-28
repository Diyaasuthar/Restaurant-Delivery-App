'use client'
import { useEffect, useState } from "react";
import CustomerHearder from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { TAX, DELIVERY_CHARGES } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [userStorage, setUserStorage] = useState(JSON.parse(localStorage.getItem('user')));
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [total] = useState(() => cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {
        return a.price + b.price
    }))
    console.log(total);
    const [removeCartData,setRemoveCartData]=useState(false);
    const router = useRouter();

    const orderNow= async ()=>{
        let user_id = JSON.parse(localStorage.getItem('user'))._id;
        let city = JSON.parse(localStorage.getItem('user')).city;
        let cart = JSON.parse(localStorage.getItem('cart'));
        let foodItemIds = cart.map((item)=>item._id).toString();
        let deliveryBoyResponse = await fetch('http://localhost:3000/api/deliveryPartner/'+city);
        deliveryBoyResponse = await deliveryBoyResponse.json();
        let deliveryBoyIds = deliveryBoyResponse.result.map((item)=>item._id);
         let deliveryBoy_id = deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds.length)]
         console.log(deliveryBoy_id);
         
         if(!deliveryBoy_id){
            alert("Delivery Partner not Available")
            return false;

         }
        let resto_id = cart[0].resto_id;
        let collection = {
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status:'confirm',
            amount:total + DELIVERY_CHARGES + (total * TAX / 100),
        }
        console.log(collection,user_id);
        

        let response = await fetch('http://localhost:3000/api/order',{
            method:'POST',
            body:JSON.stringify(collection)
        });
        response = await response.json();
        if(response.success){
            alert("Order Confirmed")
            setRemoveCartData(true)
            router.push('/myProfile')
        }else{
            alert("Order Failed")
        }
        console.log(collection);
        
    }

    useEffect(()=>{
      if(!total){
        router.push('/')
      }
    },[total])

    return (
        <div>
            <CustomerHearder removeCartData={removeCartData}/>
            <div className="total-wrapper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row">
                        <span>Name : </span>
                        <span>{userStorage.name}</span>
                    </div>
                    <div className="row">
                    <span>Address : </span>
                    <span>{userStorage.address}</span>
                    </div>
                    <div className="row">
                    <span>Mobile : </span>
                    <span>{userStorage.mobile}</span>
                 </div>
                    <h2>Amount Details</h2>
                    <div className="row">
                        <span>Food Charges : </span>
                        <span>{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax : </span>
                        <span>{total * TAX / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges : </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                    <h2>Payment Methods</h2>
                    <div className="row">
                        <span>Cash on Delivery</span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Order Now</button>
                </div>
            </div>
            <RestaurantFooter />
        </div>
    )
}

export default Page;