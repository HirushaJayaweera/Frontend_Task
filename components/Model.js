'use client';

import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

const Model = ({ type, product, setShowModal, onProductChange}) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Produce");
 
  useEffect(() => {
    if (type === "edit" && product) {
      setName(product.name);
      setQuantity(product.quantity);
      setCategory(product.category);
    }
  }, [type, product]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, quantity, category }; 
    const url = 'http://localhost:5000/items';
    const method = type === 'edit' ? 'PUT' : 'POST';
    const endpoint = type === 'edit' ? `/${product._id}` : '';
    try {
      const response = await fetch(`${url}${endpoint}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }); 
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }else{
        onProductChange();
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };
  const Categories = ["Produce", "Dairy", "Meat", "Bakery", "Pantry"];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{type === "edit" ? "Edit Product" : "Add Product"}</h3>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setShowModal(false)}
          >
            <MdClose />
          </button>
        </div>
        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <select
            className="w-full p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {Categories.map((c, index) => (
              <option key={index} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            {type === "edit" ? "Edit Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Model;
