'use client'

import { useState } from "react"
import UserLogin from "../_components/UserLogin"
import UserSignUp from "../_components/UserSignUp"

const { default: CustomerHearder } = require("../_components/CustomerHeader")
const { default: RestaurantFooter } = require("../_components/RestaurantFooter")

const UserAuth=(props)=>{
  const [login,setLogin]=useState(true)
  console.log("order flag",props);
  
  return(  
  <div>
    <CustomerHearder />
    <div className="container" >
    <h1>{login?'User Login':'User SignUp'}</h1>
    {
      login?<UserLogin redirect={props.searchParams}/>: <UserSignUp redirect={props.searchParams}/>
    }
    <button className="button-link" onClick={()=>setLogin(!login)}>
      {login?'Do not have account? SignUp':'Already have account? Login'}
    </button>
    </div>
     <RestaurantFooter />
  </div>
  )
}

export default UserAuth;