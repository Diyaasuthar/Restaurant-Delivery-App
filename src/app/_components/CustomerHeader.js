'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CustomerHearder = (props) => {
    const [cartNumber, setCartNumber] = useState(0);
    const [cartItem, setCartItem] = useState([]);
    const [user, setUser] = useState(undefined);
    const router = useRouter();

    // ✅ Get user data only on client
    useEffect(() => {
        if (typeof window !== "undefined") {
            const userStorage = localStorage.getItem('user');
            if (userStorage) {
                setUser(JSON.parse(userStorage));
            }

            const cartStorage = localStorage.getItem('cart');
            if (cartStorage) {
                const parsedCart = JSON.parse(cartStorage);
                // Calculate total items including quantities
                console.log("Cart Storage:", parsedCart);
                const totalItems = parsedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
                setCartNumber(totalItems);
                setCartItem(parsedCart);
            }
        }
    }, []);

    // ✅ Add item to cart
    useEffect(() => {
        if (typeof window !== "undefined" && props.cartData) {
            const cartStorage = JSON.parse(localStorage.getItem('cart')) || [];

            if (cartStorage.length) {
                if (cartStorage[0].resto_id !== props.cartData.resto_id) {
                    // Different restaurant, clear cart and add new item
                    const newCart = [{ ...props.cartData, quantity: 1 }];
                    localStorage.setItem('cart', JSON.stringify(newCart));
                    setCartItem(newCart);
                    setCartNumber(1);
                } else {
                    // Same restaurant, check if item already exists
                    const existingItemIndex = cartStorage.findIndex(item => item._id === props.cartData._id);
                    
                    if (existingItemIndex !== -1) {
                        // Item exists, increment quantity
                        const updatedCart = [...cartStorage];
                        updatedCart[existingItemIndex].quantity = (updatedCart[existingItemIndex].quantity || 1) + 1;
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                        setCartItem(updatedCart);
                        // Calculate total items including quantities
                        const totalItems = updatedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
                        setCartNumber(totalItems);
                    } else {
                        // New item, add with quantity 1
                        const updatedCart = [...cartStorage, { ...props.cartData, quantity: 1 }];
                        localStorage.setItem('cart', JSON.stringify(updatedCart));
                        setCartItem(updatedCart);
                        // Calculate total items including quantities
                        const totalItems = updatedCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
                        setCartNumber(totalItems);
                    }
                }
            } else {
                // Empty cart, add first item
                const newCart = [{ ...props.cartData, quantity: 1 }];
                localStorage.setItem('cart', JSON.stringify(newCart));
                setCartItem(newCart);
                setCartNumber(1);
            }
        }
    }, [props.cartData]);

    // ✅ Remove item from cart
    useEffect(() => {
        if (typeof window !== "undefined" && props.removeCartData) {
            const filteredCart = cartItem.filter(item => item._id !== props.removeCartData);
            setCartItem(filteredCart);
            // Calculate total items including quantities
            const totalItems = filteredCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
            setCartNumber(totalItems);
            if (filteredCart.length > 0) {
                localStorage.setItem('cart', JSON.stringify(filteredCart));
            } else {
                localStorage.removeItem('cart');
            }
        }
    }, [props.removeCartData]);

    // ✅ Clear cart when needed
    useEffect(() => {
        if (typeof window !== "undefined" && props.removeCartData) {
            setCartItem([]);
            setCartNumber(0);
            localStorage.removeItem('cart');
        }
    }, [props.removeCartData]);

    // ✅ Logout
    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('user');
            router.push('/user-auth');
        }
    };

    return (
        <div className="header-wrapper">
            <div className="logo">
                <img
                    style={{ width: 100 }}
                    src="https://static.vecteezy.com/system/resources/previews/053/762/082/non_2x/food-delivery-catering-fast-food-logo-icon-free-vector.jpg"
                />
            </div>
            <ul>
                <li><Link href="/">Home</Link></li>
                {
                    user ? (
                        <>
                            <li><Link href="/myProfile">{user?.name}</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                             <li><Link href={cartNumber ? "/cart" : "#"}>Cart ({cartNumber})</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link href="/user-auth">Login/SignUp</Link></li>
                        </>
                    )
                }
                <li><Link href="/restaurant">Add Restaurant</Link></li>
                 <li><Link href="/deliveryPartner">Delivery Partner</Link></li>
            </ul>
        </div>
    );
};

export default CustomerHearder;
