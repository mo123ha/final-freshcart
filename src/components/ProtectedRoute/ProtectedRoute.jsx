import React from 'react'

// import   style from"./protectedRoute.module.css"
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(props) {

  if (localStorage.getItem("usertoken")){
   return props.children
  }else {
    return <Navigate to={"/login"} />
    
  }

}
