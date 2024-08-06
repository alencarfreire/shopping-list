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
      <input
        type="text"
        placeholder="Nome do item"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 p-2 border"
      />
      <input
        type="number"
        placeholder="Quantidade"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className="mb-2 p-2 border"
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        Adicionar Item
      </button>
    </form>
  );
};

export default AddItemForm;
