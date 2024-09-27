import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Protected from "./services/Protected";
import Layout from "./layout/Layout";

export default function App() {
  return (
    <BrowserRouter >
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route path="/" element={<Protected/>} >
      <Route element={<Layout/>} >
      <Route path="/" element={<Home/>} />
      <Route path="/product/:proId" element={<Product/>} />
      <Route path="/cart" element={<Cart/>} />
      </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  )
}