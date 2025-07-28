import { useRouter } from "next/navigation";
import { useState } from "react";

const UserSignUp=(props)=>{

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [city,setCity]=useState('');
    const [address,setAddress]=useState('');
    const [mobile,setMobile]=useState('');
    const router = useRouter();
    
    const handleSignUp=async ()=>{
      console.log(name,email,password,confirmPassword,city,address,mobile);
      let response = await fetch('http://localhost:3000/api/user',{
        method:'post',
        body:JSON.stringify({name,email,password,city,address,mobile})
      })
      response = await response.json(); 
      if(response.success){
        alert("User Signup Successfully")
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
    <input type="text" value={name} onChange={(event)=>setName(event.target.value)} className="input-field" placeholder="Enter Name" />
    </div>
    <div className="input-wrapper">
    <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} className="input-field" placeholder="Enter Email" />
    </div>
    <div className="input-wrapper">
    <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} className="input-field" placeholder="Enter Password" />
    </div>
    <div className="input-wrapper">
    <input type="text" value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)} className="input-field" placeholder="Enter Confirm Password" />
    </div>
    <div className="input-wrapper">
    <input type="text" value={city} onChange={(event)=>setCity(event.target.value)} className="input-field" placeholder="Enter City" />
    </div>
    <div className="input-wrapper">
    <input type="text" value={address} onChange={(event)=>setAddress(event.target.value)} className="input-field" placeholder="Enter Address" />
    </div>
    <div className="input-wrapper">
    <input type="text" value={mobile} onChange={(event)=>setMobile(event.target.value)} className="input-field" placeholder="Enter Mobile Number" />
    </div>
    <div className="input-wrapper">
    <button onClick={handleSignUp} className="button">SignUp</button>
    </div>
  </div>
  )
}

export default UserSignUp;