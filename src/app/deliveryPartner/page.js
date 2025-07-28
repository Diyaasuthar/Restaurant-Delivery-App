    'use client'
    import { useEffect, useState } from "react";
import DeliveryHearder from "../_components/deliveryHeader";
import { useRouter } from "next/navigation";

    const Page = () => {

        const [loginMobile, setLoginMobile] = useState('');
        const [loginPassword, setLoginPassword] = useState('');

        const [name, setName] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [city, setCity] = useState('');
        const [address, setAddress] = useState('');
        const [mobile, setMobile] = useState('');
        const router = useRouter();


        const handleSignUp = async () => {
            console.log(name, mobile, password, confirmPassword, city, address);
            let response = await fetch('http://localhost:3000/api/deliveryPartner/signup', {
                method: 'post',
                body: JSON.stringify({ name, mobile, password, city, address })
            })
            response = await response.json();
            if (response.success) {
                const { result } = response;
                delete result.password;
                localStorage.setItem('delivery', JSON.stringify(result));
                router.push('/deliverydashboard')

            } else {
                alert("failed")
            }
        }

        const loginHandle = async () => {
            let response = await fetch('http://localhost:3000/api/deliveryPartner/login', {
                method: 'post',
                body: JSON.stringify({ mobile: loginMobile, password: loginPassword })
            })
            response = await response.json();
            if (response.success) {
                const { result } = response;
                delete result.password;
                localStorage.setItem('delivery', JSON.stringify(result));
                router.push('/deliverydashboard')
            } else {
                alert("failed to login. Please try again with valid mobile and password")
            }
        }

        useEffect(()=>{
           const delivery = JSON.parse(localStorage.getItem('delivery'));
           if(delivery){
            router.push('/deliverydashboard')
           }
        },[])

        return (
            <div>
                <DeliveryHearder />
                <h1>Deliver Partner</h1>
                <div className="auth-container">
                <div className="login-wrapper">
                    <h3>Login</h3>
                    <div className="input-wrapper" >
                        <input type="text" placeholder="Enter Mobile Number" value={loginMobile} className="input-field" onChange={(event) => setLoginMobile(event.target.value)} />
                    </div>
                    <div className="input-wrapper" >
                        <input type="text" placeholder="Enter Password" value={loginPassword} className="input-field" onChange={(event) => setLoginPassword(event.target.value)} />
                    </div>
                    <div className="input-wrapper">
                        <button className="button" onClick={loginHandle}>Login</button>
                    </div>
                </div>
                <div className="signup-wrapper">
                    <h3>SignUp</h3>
                    <div className="input-wrapper">
                        <input type="text" value={name} onChange={(event) => setName(event.target.value)} className="input-field" placeholder="Enter Name" />
                    </div>
                    <div className="input-wrapper">
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="input-field" placeholder="Enter Password" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="input-field" placeholder="Enter Confirm Password" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" value={city} onChange={(event) => setCity(event.target.value)} className="input-field" placeholder="Enter City" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} className="input-field" placeholder="Enter Address" />
                    </div>
                    <div className="input-wrapper">
                        <input type="text" value={mobile} onChange={(event) => setMobile(event.target.value)} className="input-field" placeholder="Enter Mobile Number" />
                    </div>
                    <div className="input-wrapper">
                        <button className="button" onClick={handleSignUp}>SignUp</button>
                    </div>
                </div>
                </div>
            </div>
        )
    }

    export default Page;