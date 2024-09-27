import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatusTab } from "../store/cart";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const carts = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    let total = 0;
    carts.forEach((item) => (total += item.quantity));
    setQuantity(total);
  });

  const handleOpenTab = () => {
    dispatch(toggleStatusTab());
  };

  const handleLogOut = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("loggedIn");
    window.location.href = "/login";
  };

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the state
  };

  return (
    <nav className="block w-full px-4 py-2 mx-auto shadow-md lg:px-8 lg:py-3 bg-[#166373]">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
        {/* Logo */}
        <Link to="/" className="font-extrabold text-3xl text-white">
          Pet.me
        </Link>

        {/* Menu for larger screens */}
        <div className='hidden lg:block  '>
          <ul className="flex flex-col lg:flex-row gap-2 mt-4 lg:mt-0 lg:items-center lg:gap-6">
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <div className="w-10 h-10 rounded-full flex justify-center items-center relative" onClick={handleOpenTab}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  color="white"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-9"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <span
                  className="absolute top-2/3 bg-red-700 text-white text-sm w-5 h-5 rounded-full flex justify-center items-center"
                >
                  {quantity}
                </span>
              </div>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-slate-600">
              <Button variant="outlined" className="text-white" onClick={handleLogOut}>
                Logout
              </Button>
            </li>
          </ul>
        </div>

        {/* Toggle button for small screens */}
        <button
          className="ml-auto relative h-8 w-8 lg:hidden text-white"
          type="button"
          onClick={handleToggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } lg:hidden mt-2 px-4 py-2 bg-transparent shadow-md text-center rounded-md`}
      >
        <ul className="flex flex-col gap-2">
          {/* <li
            className="p-2 text-2xl font-extrabold text-white "
            onClick={handleOpenTab}
          >
            Cart {quantity}
          </li> */}
          <li className="p-2 text-sm text-slate-600 ">
            <Button  variant="outlined" className="w-full text-white max-w-32 bg-[#166373] outline-white" onClick={handleLogOut}>
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
