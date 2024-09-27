
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Cart from '../pages/Cart'

function Layout() {
  return (
    <div className="App bg-[#f5f5f5] ">
      <Navbar/>  
      <Cart/>
      <Outlet/>
    </div>
  )
}

export default Layout
