import { useRouter } from "next/navigation";

const { useState } = require("react")

const UserLogin = (props)=>{

   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const router = useRouter();

   const handleLogin= async ()=>{
    console.log(email,password);
      let response = await fetch('http://localhost:3000/api/user/login',{
        method:'post',
        body:JSON.stringify({email,password})
      })
      response = await response.json();
      if(response.success){
        alert("User Login Successfully")
        const {result} = response;
        delete result.password;
        localStorage.setItem('user',JSON.stringify(result));
        if(props?.redirect?.order){
          router.push('/order')
        }else{
        router.push('/')
        }
      }else{
        alert("Something Failed")
      }
      
    
   }

    return(
        <div>
            <div className="input-wrapper">
               <input type="text" placeholder="Enter Email" className="input-field" value={email} onChange={(event)=>setEmail(event.target.value)}/>
            </div>
             <div className="input-wrapper">
               <input type="password" placeholder="Enter Password" className="input-field" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </div>
             <div className="input-wrapper">
              <button onClick={handleLogin} className="button">Login</button>
            </div>
        </div>
    )
}

export default UserLogin;