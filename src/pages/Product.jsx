import { Button, Typography } from "@material-tailwind/react"
import { useParams } from "react-router-dom"
import FetchProduct from "../utils/fetchProduct";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cart";
import { useState } from "react";

const Product = () => {
  const [quantity, setQuantity] = useState(1)
  const carts = useSelector((store) => store.cart.items)

  const proId = useParams()
  const productInfo = FetchProduct(proId)
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    dispatch(addToCart({
      productId: productInfo.id,
      quantity: quantity
    }))
  }

  const handleMinus = () => {
    setQuantity(quantity - 1 < 1 ? 1 : quantity - 1);
  }
  const handlePlus = () => {
    setQuantity(quantity + 1)
  }

  return (
    <>
      {productInfo ? (
        <div className="container mx-auto  mt-20 ">
          <div className="flex justify-center items-center my-11">
            <h1 className="text-3xl font-extrabold font-primary ">PRODUCT DETAILS</h1>
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full  items-center">
            <div className="md:h-80 h-44 w-full  mb-5 bg-white rounded-lg shadow-sm">
              <img
                src={productInfo.image}
                alt={productInfo.title}
                className="w-full h-full object-contain  shadow-sm "
              />
            </div>
            <div className=" w-full h-full">
              <div className="ml-5 ">
                <Typography variant="h2" className="font-primary my-2 truncate text-start text-wrap">
                  {productInfo.title}
                </Typography>
                <div className="flex flex-col my-2">
                  <Typography tag="h2" className="font-primary font-extrabold">$ {productInfo.price}</Typography>
                </div>
                <div className="flex  gap-5  py-2">
                  <Button className="bg-[#166373]" size="sm" onClick={handleAddToCart}>Add to cart</Button>
                  <div className="flex gap=5" >
                    <div className="flex g justify-center items-center">
                      <button className="bg-gray-100 h-full w-10 font-bold text-2xl border border-black rounded-md" onClick={handlePlus}>+</button>
                      <span className="bg-gray-100 h-full w-10 font-bold text-xl text-center">{quantity}</span>
                      <button className="bg-gray-100 h-full w-10 font-bold text-2xl border border-black rounded-md" onClick={handleMinus}>-</button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col my-2">
                  <Typography className="truncate mr-5 font-primary text-wrap" tag="h5">{productInfo.description}</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>....</h1>
      )}
    </>
  )
}

export default Product
