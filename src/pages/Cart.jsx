import { useDispatch, useSelector } from "react-redux"
import CartItem from "../components/CartItem";
import { toggleStatusTab } from "../store/cart";


const Cart = () => {
  const dispatch=useDispatch()
  const carts = useSelector(store => store.cart.items)
  const statusTab=useSelector(store=>store.cart.statusTab)

  const handleCloseTab=()=>{
    dispatch(toggleStatusTab())
  }


  return(
    <div className={`fixed top-0 right-0 bg-[#e1e2e2] shadow-2xl w-96 h-full grid grid-rows-[60px_1fr_60px] transform transition-transform duration-500
    ${statusTab===false ?"translate-x-full":""}`}>
      <h2 className="p-5 text-black font-extrabold  text-2xl ">Shopping Cart</h2>
<div className="bg-red">
    {carts.map((item,index)=>(
      <CartItem key={index} data={item}/>
    ))}
</div>
<div className="grid grid-cols-2">
<button className="bg-red-500 text-white" onClick={handleCloseTab}>CLOSE</button>
<button className="bg-green-500 text-white">CHECKOUT</button>
</div>
    </div>
  )
}

export default Cart
