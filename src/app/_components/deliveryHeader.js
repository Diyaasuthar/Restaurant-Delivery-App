'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DeliveryHearder = (props) => {
    const [user, setUser] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userStorage = localStorage.getItem('delivery');
            if (userStorage) {
                setUser(JSON.parse(userStorage));
            }
        }
    }, []);

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem('delivery');
            router.push('/deliveryPartner');
        }
    };

    return (
        <div className="header-wrapper flex justify-between items-center px-4 py-2 bg-white shadow-md">
            <div className="logo">
                <img
                    style={{ width: 100 }}
                    src="https://static.vecteezy.com/system/resources/previews/053/762/082/non_2x/food-delivery-catering-fast-food-logo-icon-free-vector.jpg"
                    alt="Logo"
                />
            </div>
            <ul className="flex gap-4 items-center list-none">
                <li><Link href="/">Home</Link></li>
                 {
                    user ? (
                        <>
                            <li><Link href="/deliverydashboard">{user?.name}</Link></li>
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link href="/deliveryPartner">Login/SignUp</Link></li>
                        </>
                    )
                }
            </ul>
        </div>
    );
};

export default DeliveryHearder;
