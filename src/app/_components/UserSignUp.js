'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

const UserSignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
        address: '',
        city: ''
    });
    const [errors, setErrors] = useState({});
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        let response = await fetch('/api/user',{
            method: 'POST',
            body: JSON.stringify(formData)
        });
        response = await response.json();
        if(response.success){
            localStorage.setItem('user',JSON.stringify(response.result));
            router.push('/');
        }else{
            setErrors(response.error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="auth-bg">
            <div className="auth-card">
                <h2>User Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.name && <div className="input-error">{errors.name}</div>}
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.email && <div className="input-error">{errors.email}</div>}
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.password && <div className="input-error">{errors.password}</div>}
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="mobile"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.mobile && <div className="input-error">{errors.mobile}</div>}
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={formData.address}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.address && <div className="input-error">{errors.address}</div>}
                    </div>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="input-field"
                        />
                        {errors.city && <div className="input-error">{errors.city}</div>}
                    </div>
                    <button type="submit" className="button">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default UserSignUp;