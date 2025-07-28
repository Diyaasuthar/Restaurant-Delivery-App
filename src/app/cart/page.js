'use client'
import { useState } from "react";
import CustomerHearder from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { TAX, DELIVERY_CHARGES } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem('cart')));
    const [total]=useState(()=>cartStorage.length==1?cartStorage[0].price:cartStorage.reduce((a,b)=>{
        return a.price+b.price
    }))
    console.log(total);
    const router = useRouter();

    const orderNow=()=>{
        if(JSON.parse(localStorage.getItem('user'))){
        router.push('/order')
        }else{
            router.push('/user-auth?order=true')
        }
    }
    
    return (
        <div>
            <CustomerHearder />
            <div className="food-item-wrapper">
                {
                    cartStorage.length > 0 ? cartStorage.map((item, index) => (
                        <div key={index} className="list-item">
                            <div className="list-item-block-1"><img style={{ width: 100 }} src={item.path} /></div>
                            <div className="list-item-block-2">
                                <div>{item.name}</div>
                                <div className="description">{item.description}</div>
                                {
                                    <button onClick={() => removeFromCart(item._id)}>Remove From Cart</button>

                                }
                                <div className="list-item-block-3 ">Price: {item.price}</div>

                            </div>
                        </div>
                    )) :
                        <h1>No Food Items Added For Now</h1>
                }
            </div>
            <div className="total-wrapper">
                <div className="block-1">
                    <div className="row">
                    <span>Food Charges : </span>
                    <span>{total}</span>
                </div>
                <div className="row">
                    <span>Tax : </span>
                    <span>{total*TAX/100}</span>
                </div>
                <div className="row">
                    <span>Delivery Charges : </span>
                    <span>{DELIVERY_CHARGES}</span>
                </div>
                <div className="row">
                    <span>Total Amount : </span>
                    <span>{total+DELIVERY_CHARGES+(total*TAX/100)}</span>
                </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Place Order Now</button>
                </div>
            </div>
            <RestaurantFooter />
        </div>
    )
}

export default Page;