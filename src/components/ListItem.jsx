import React from "react";

const ListItem = ({ item, onRemove }) => {
  return (
    <li className="flex justify-between p-2 border-b">
      <span>
        {item.name} - {item.quantity}
      </span>
      <button onClick={() => onRemove(item.id)} className="text-red-500">
        Excluir
      </button>
    </li>
  );
};

export default ListItem;
