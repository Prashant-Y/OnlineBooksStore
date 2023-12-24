import { Navigate, Outlet } from "react-router-dom"
import { path } from "../App"

export const Private=()=>{
    const isLogin=localStorage.getItem('isLogin')
    console.log('inside private')
    if(!isLogin){
        return<Navigate to={path.login} />
    }else{
        return<Outlet/>
    }
   
}