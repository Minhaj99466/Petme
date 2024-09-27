import React from 'react';
import FetchProduct from '../utils/fetchProduct';
import { useDispatch } from 'react-redux';
import { removeItem } from '../store/cart';
 // Import the FetchProduct component or hook

const CartItem = (props) => {
  const dispatch =useDispatch()
  const { productId, quantity } = props.data;
  const productDetail = FetchProduct({ proId: productId }); 

  if (!productDetail) {
    return <div>Loading...</div>;
  }

  const handleDelete = (id) => {    
    dispatch(removeItem({ productId: id }));
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <img
        src={productDetail.image}
        alt={productDetail.title}
        className="w-20 h-20 object-contain"
      />
      <div className="flex-1">
        <h4 className="font-bold">{productDetail.title}</h4>
        <p className="text-gray-500">{productDetail.category}</p>
        <p className="text-gray-800">${productDetail.price}</p>
        <p className="text-gray-700">Quantity: {quantity}</p>
      </div>
      <div>
        <button
          onClick={()=>handleDelete(productDetail.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
