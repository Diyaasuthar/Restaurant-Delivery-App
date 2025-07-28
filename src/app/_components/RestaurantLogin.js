import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantLogin=()=>{

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState(false)
  const route = useRouter();

  const handleLogin= async ()=>{
    if(!email || !password){
      setError(true);
      return false
    }else{
      setError(false)
    }
    let response = await fetch("http://localhost:3000/api/restaurant",{
      method:'POST',
      body:JSON.stringify({email,password,login:true})
    });
    response = await response.json();
    if(response.success){
      alert("Login Success")
      const {result} = response;
      delete result.password;
      localStorage.setItem("restaurantUser",JSON.stringify(result));
      route.push("/restaurant/dashboard")
    }      
  }

    return(
        <div className="auth-bg">
          <div className="auth-card">
            <h2>Restaurant Login</h2>
            <div className="input-wrapper">
              <input type="text" placeholder="Enter Email id" className="input-field" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              {error && !email && <span className="input-error">Please Enter Data</span>}
            </div>
             <div className="input-wrapper">
              <input type="password" placeholder="Enter Password" className="input-field" value={password} onChange={(e)=>setPassword(e.target.value)}/>
               {error && !password && <span className="input-error">Please Enter Data</span>}
            </div>
             <div className="input-wrapper">
              <button onClick={handleLogin} className="button">Login</button>
            </div>
          </div>
        </div>
    )
}

export default RestaurantLogin;