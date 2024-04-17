"use client";
import React, { useState, useEffect } from "react";
import Card from "./CategoryCard";
import Model from "./Model";
import ListForm from "./ListForm";

const ShoppingList = () => {
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductChange = async () => {
    await fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const data = await response.json();
      const products = [
        {
          category: "Produce",
          products: data.filter((product) => product.category === "Produce"),
        },
        {
          category: "Diary",
          products: data.filter((product) => product.category === "Dairy"),
        },
        {
          category: "Meat",
          products: data.filter((product) => product.category === "Meat"),
        },
        {
          category: "Bakery",
          products: data.filter((product) => product.category === "Bakery"),
        },
        {
          category: "Pantry",
          products: data.filter((product) => product.category === "Pantry"),
        },
      ];
      setProductList(products);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (product) => {
    try {
      const response = await fetch(
        `http://localhost:5000/items/${product._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  return (
    <>
      <ListForm onProductChange={handleProductChange} />
      {loading && <div className="mt-2">Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {productList.map((category, index) => (
          <Card
            key={index}
            category={category.category}
            products={category.products}
            onEdit={(product) => {
              setSelectedProduct(product);
              setShowModal(true);
            }}
            onDelete={(productItem) => handleDelete(productItem)}
          />
        ))}
        {showModal && (
          <Model
            type={selectedProduct ? "edit" : "add"}
            product={selectedProduct}
            setShowModal={setShowModal}
            onProductChange={handleProductChange}
          />
        )}
      </div>
    </>
  );
};

export default ShoppingList;
