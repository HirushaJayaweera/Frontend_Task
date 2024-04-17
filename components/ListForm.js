"use client";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Model from "./Model";

const ListForm = ({onProductChange}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className=" flex justify-center items-center gap-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded w-full"
      >
        Add New Product <AiOutlinePlus size={18} />
      </button>

      {showModal && <Model type="add Product" product={null} setShowModal={setShowModal} onProductChange={onProductChange}/>}
    </>
  );
};

export default ListForm;
