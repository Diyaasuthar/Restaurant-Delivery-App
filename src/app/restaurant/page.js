'use client'
import { useState } from "react";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";
import RestaurantHeader from "../_components/RestaurantHeader";
import './style.css'
import RestaurantFooter from "../_components/RestaurantFooter";

const Restaurant=()=>{
    const [login,setLogin]=useState(true)
    return(
        <>
        <div className="container">
            <RestaurantHeader />
         <h1>Restaurant Login/Signup Page</h1>
         {
            login?  <RestaurantLogin />:  <RestaurantSignUp />
         }
        <div>     
         <button className="button-link" onClick={()=>setLogin(!login)}>{login?"Do not have account? SignUp":"Already have account? Login"}</button>
         </div>
        </div>
        <RestaurantFooter />
        </>
    )
}

export default Restaurant;