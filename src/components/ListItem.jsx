import React, { useState } from "react";

const ListItem = ({ item, onRemove, onTogglePurchased, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity);

  const handleSaveEdit = () => {
    onEdit(item.id, editName, editQuantity);
    setIsEditing(false);
  };

  return (
    <li
      className={`flex justify-between p-2 border-b ${
        item.isPurchased ? "line-through text-gray-500" : ""
      }`}
    >
      {isEditing ? (
        <div className="flex-grow">
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border p-1 mr-2"
          />
          <input
            type="number"
            value={editQuantity}
            onChange={(e) => setEditQuantity(e.target.value)}
            className="border p-1 mr-2"
          />
          <button onClick={handleSaveEdit} className="text-blue-500 mr-2">
            Salvar
          </button>
          <button onClick={() => setIsEditing(false)} className="text-gray-500">
            Cancelar
          </button>
        </div>
      ) : (
        <>
          <span>
            {item.name} - {item.quantity}
          </span>
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="text-yellow-500 mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => onTogglePurchased(item.id)}
              className="text-green-500 mr-2"
            >
              {item.isPurchased ? "Desmarcar" : "Comprar"}
            </button>
            <button onClick={() => onRemove(item.id)} className="text-red-500">
              Excluir
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default ListItem;
