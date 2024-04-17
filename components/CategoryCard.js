import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const CategoryCard = ({ category, products, onEdit, onDelete}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 overflow-auto">
      <h2 className="text-xl font-bold mb-4">{category}</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left font-medium text-gray-700 p-2">Product</th>
            <th className="text-left font-medium text-gray-700 p-2">Quantity</th>
            <th className="text-left font-medium text-gray-700 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">{product.name}</td>
              <td className="p-2">{product.quantity}</td>
              <td className="p-2">
                <div className="flex gap-2">
                  <BiEdit
                    onClick={() => onEdit(product)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                  />
                  <AiOutlineDelete
                    onClick={() => onDelete(product)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryCard;
