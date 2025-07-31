'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        let response = await fetch('/api/user/login',{
            method: 'POST',
            body: JSON.stringify({email, password})
        });
        response = await response.json();
        if(response.success){
            localStorage.setItem('user',JSON.stringify(response.result));
            router.push('/');
        }else{
            alert("Login Failed");
        }
    };

    return (
        <div className="auth-bg">
            <div className="auth-card">
                <h2>User Login</h2>
                <div className="input-wrapper">
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(event) => setEmail(event.target.value)} 
                        className="input-field" 
                        placeholder="Enter Email" 
                    />
                </div>
                <div className="input-wrapper">
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(event) => setPassword(event.target.value)} 
                        className="input-field" 
                        placeholder="Enter Password" 
                    />
                </div>
                <div className="input-wrapper">
                    <button onClick={handleLogin} className="button">Login</button>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;