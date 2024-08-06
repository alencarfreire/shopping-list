import React from "react";

const ListItem = ({ item, onRemove, onTogglePurchased }) => {
  return (
    <li
      className={`flex justify-between p-2 border-b ${item.isPurchased ? "line-through text-gray-500" : ""}`}
    >
      <span>
        {item.name} - {item.quantity}
      </span>
      <button
        onClick={() => onTogglePurchased(item.id)}
        className="text-green-500 mr-2"
      >
        {item.isPurchased ? "Desmarcar" : "Comprar"}
      </button>
      <button onClick={() => onRemove(item.id)} className="text-red-500">
        Excluir
      </button>
    </li>
  );
};

export default ListItem;
