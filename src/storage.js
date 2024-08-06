export const saveItemsToLocalStorage = (items) => {
  localStorage.setItem("shopping-list", JSON.stringify(items));
};

export const getItemsFromlocalStorage = () => {
  const items = localStorage.getItem("shopping-list");
  return items ? JSON.parse(items) : [];
};
