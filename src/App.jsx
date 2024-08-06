import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AddItemForm from "./components/AddItemForm.jsx";
import ListItem from "./components/ListItem";
import { saveItemsToLocalStorage, getItemsFromlocalStorage } from "./storage";

const App = () => {
  const [items, setItems] = useState([]);

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
    setItems([...items, item]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <AddItemForm onAdd={handleAddItem} />
        <ul>
          {items.map((item) => (
            <ListItem key={item.id} item={item} onRemove={handleRemoveItem} />
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default App;
