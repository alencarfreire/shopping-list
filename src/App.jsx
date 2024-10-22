import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AddItemForm from "./components/AddItemForm.jsx";
import ListItem from "./components/ListItem";
import { saveItemsToLocalStorage, getItemsFromlocalStorage } from "./storage";

const App = () => {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
  const filteredItems = items
    .filter((item) => {
      if (filter === "purchased") {
        return item.isPurchased;
      } else if (filter === "notPurchased") {
        return !item.isPurchased;
      }
      return true; // 'all'
    })
    .filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
    });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto p-4">
          <AddItemForm onAdd={handleAddItem} />
          <div className="flex flex-wrap justify-center items-center mb-4">
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
          <div className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar item..."
              className="input-search"
            />
          </div>
          <ul className="divide-y divide-gray-300">
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
      </div>
    </>
  );
};

export default App;
