import React, { useState } from "react";

const AddItemForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && quantity) {
      onAdd({ id: Date.now(), name, quantity });
      setName("");
      setQuantity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-4">
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Nome do item"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Adicionar Item
      </button>
    </form>
  );
};

export default AddItemForm;
