import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AddItemForm from "./components/AddItemForm.jsx";
import ListItem from "./components/ListItem";
import { saveItemsToLocalStorage, getItemsFromlocalStorage } from "./storage";

const App = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    console.log(
      "Carregando itens do Local Storage:",
      getItemsFromlocalStorage()
    );
    setItems(getItemsFromlocalStorage());
  }, []);

  useEffect(() => {
    console.log("Salvando itens no Local Storage:", items);
    saveItemsToLocalStorage(items);
  }, [items]);

  const handleAddItem = (item) => {
    setItems([...items, { ...item, isPurchased: false }]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleTogglePurchased = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isPurchased: !item.isPurchased } : item
      )
    );
  };

  const handleEditItem = (id, newName, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, name: newName, quantity: newQuantity }
          : item
      )
    );
  };
  const filteredItems = items.filter((item) => {
    if (filter === "purchased") {
      return item.isPurchased;
    } else if (filter === "notPurchased") {
      return !item.isPurchased;
    }
    return true; // 'all'
  });

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <AddItemForm onAdd={handleAddItem} />
        <div className="mb-4 flex justify-center">
          <button
            onClick={() => setFilter("all")}
            className={`button-filter ${filter === "all" ? "active" : ""}`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("purchased")}
            className={`button-filter ${filter === "purchased" ? "active" : ""}`}
          >
            Comprados
          </button>
          <button
            onClick={() => setFilter("notPurchased")}
            className={`button-filter ${filter === "notPurchased" ? "active" : ""}`}
          >
            Não Comprados
          </button>
        </div>
        <ul>
          {filteredItems.map((item) => (
            <ListItem
              key={item.id}
              item={item}
              onRemove={handleRemoveItem}
              onTogglePurchased={handleTogglePurchased}
              onEdit={handleEditItem}
            />
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default App;
