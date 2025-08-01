'use client'
import { useState, useEffect } from "react";
import CustomerHearder from "../_components/CustomerHeader";
import RestaurantFooter from "../_components/RestaurantFooter";
import { TAX, DELIVERY_CHARGES } from "../lib/constant";
import { useRouter } from "next/navigation";

const Page = () => {
    const [cartStorage, setCartStorage] = useState([]);
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        // Only access localStorage on the client side
        if (typeof window !== 'undefined') {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            
            // Remove duplicates and merge quantities for same items
            const uniqueCart = [];
            const itemMap = new Map();
            
            cart.forEach(item => {
                if (itemMap.has(item._id)) {
                    // Item already exists, add quantities
                    const existingItem = itemMap.get(item._id);
                    existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
                } else {
                    // New item, add to map
                    const newItem = {
                        ...item,
                        quantity: item.quantity || 1
                    };
                    itemMap.set(item._id, newItem);
                    uniqueCart.push(newItem);
                }
            });
            
            setCartStorage(uniqueCart);
            localStorage.setItem('cart', JSON.stringify(uniqueCart));
            
            if (uniqueCart.length > 0) {
                const calculatedTotal = uniqueCart.reduce((sum, item) => 
                    sum + (Number(item.price) * (item.quantity || 1)), 0);
                setTotal(calculatedTotal);
            }
        }
    }, []);

    const orderNow = () => {
        if (typeof window === 'undefined') return;
        
        if (JSON.parse(localStorage.getItem('user'))) {
            router.push('/order')
        } else {
            router.push('/user-auth?order=true')
        }
    }

    const updateQuantity = (itemId, newQuantity) => {
        if (typeof window === 'undefined') return;
        
        if (newQuantity <= 0) {
            // Remove item if quantity is 0 or less
            removeFromCart(itemId);
            return;
        }

        const updatedCart = cartStorage.map(item => 
            item._id === itemId ? { ...item, quantity: newQuantity } : item
        );
        
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
        // Recalculate total
        const newTotal = updatedCart.reduce((sum, item) => 
            sum + (Number(item.price) * (item.quantity || 1)), 0);
        setTotal(newTotal);
    };

    const removeFromCart = (itemId) => {
        if (typeof window === 'undefined') return;
        
        const updatedCart = cartStorage.filter(item => item._id !== itemId);
        setCartStorage(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        
        if (updatedCart.length > 0) {
            const newTotal = updatedCart.reduce((sum, item) => 
                sum + (Number(item.price) * (item.quantity || 1)), 0);
            setTotal(newTotal);
        } else {
            setTotal(0);
            // Cart is empty, refresh page to redirect to home
            window.location.href = '/';
        }
    };

    // Show loading state while data is being loaded
    if (typeof window === 'undefined') {
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
            <div className="food-item-wrapper">
                {
                    cartStorage.length > 0 ? cartStorage.map((item, index) => (
                        <div key={index} className="list-item">
                            <div className="list-item-block-1">
                                <img style={{ width: 100 }} src={item.path} />
                            </div>
                            <div className="list-item-block-2">
                                <div className="item-name">{item.name}</div>
                                <div className="description">{item.description}</div>
                                <div className="quantity-controls">
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                                    >
                                        -
                                    </button>
                                    <span className="quantity-display">{item.quantity || 1}</span>
                                    <button 
                                        className="quantity-btn"
                                        onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="item-price">
                                    Price: ₹{item.price} × {item.quantity || 1} = ₹{(item.price * (item.quantity || 1))}
                                </div>
                                <button 
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item._id)}
                                >
                                    Remove From Cart
                                </button>
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
                        <span>₹{total}</span>
                    </div>
                    <div className="row">
                        <span>Tax : </span>
                        <span>₹{(total * TAX / 100).toFixed(2)}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges : </span>
                        <span>₹{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Amount : </span>
                        <span>₹{(total + DELIVERY_CHARGES + (total * TAX / 100)).toFixed(2)}</span>
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