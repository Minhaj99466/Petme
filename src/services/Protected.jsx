import { Outlet,Navigate } from "react-router-dom"

function Protected() {
    if (localStorage.getItem('loggedIn')) {
        return <Outlet/>
        }
        
        return <Navigate to='/login'/>
}

export default Protected
