import { Link } from "react-router-dom";
import { PRODUCT_LIST } from "../utils/constants"
import FetchList from "../utils/fetch"
import {
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { addToCart } from "../store/cart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";




export function CardEcom() {
  const [searchText, setSearchText] = useState('')
  const list = FetchList(PRODUCT_LIST)
  const [sortOrder, setSortOrder] = useState('');
  const carts = useSelector(store => store.cart.items)

  const dispatch = useDispatch()

  const handleAddToCart = (id) => {
    dispatch(addToCart({
      productId: id,
      quantity: 1

    }))
  }
                // Search //

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredList = list && list.length > 0 ? list.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase())
  ) : [];

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

                // Sort //

  const sortedList = filteredList.sort((a, b) => {
    if (sortOrder === 'lowToHigh') {
      return a.price - b.price; 
    } else if (sortOrder === 'highToLow') {
      return b.price - a.price; 
    }
    return 0; 
  });

  return (
    <>
      <div >
        <div className="flex justify-between">
          <div className="mb-5">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearchChange}
              className="w-full max-w-sm bg-white placeholder:text-black text-slate-700 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            />
          </div>
          <div className="w-full max-w-sm min-w-[200px]">
            <div className=" gap-5">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="w-full bg-white placeholder:text-slate-400 text-black text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md  cursor-pointer">
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className=" grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 ">
          {list && filteredList.length > 0 ? (
            filteredList.map((item, index) => (
              <div key={index} className="bg-white border border-r-2 rounded-xl shadow-2xl py-5">
                <Link to={"/product/" + item.id}>
                  <div className="md:h-80 h-44 w-full  mb-5 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain  shadow-sm "
                    />
                  </div>
                </Link>
                <div className="ml-5 ">

                  <Typography tag="h5" className="font-primary my-2 truncate text-start">
                    {item.title}
                  </Typography>
                  <div className="flex flex-col my-2">
                    <Typography tag="h3" className="font-primary">${item.price}</Typography>
                  </div>
                  <div className="flex flex-col my-2">
                    <Typography className="truncate mr-5 font-primary" tag="h5">{item.category}</Typography>
                  </div>
                  <div className="flex justify-center items-end py-2">

                    <Button className="bg-[#166373]" onClick={() => handleAddToCart(item.id)}>Add to cart</Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Typography className="text-center">No products found.</Typography>
          )}
        </div>
      </div>
    </>

  )
}

export default Card

