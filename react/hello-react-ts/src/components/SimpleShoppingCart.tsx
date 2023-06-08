import { useState } from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import { ShoppingItem } from "../models/Shop";
import { produce } from "immer";

export default function SimpleShoppingCart() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: 1, title: "milk 1", quantity: 1, category: "dairy" },
    { id: 2, title: "snack 1", quantity: 2, category: "snacks" },
    { id: 3, title: "snack 2 ", quantity: 3, category: "snacks" },
  ]);

  const [category, setCategory] = useState("all");

  const total = calculateTotal();

  const filteredList = filterByCategory(category);

  function updateShoppingList(item: ShoppingItem) {
    setShoppingList(
      // using immer
      // produce((draft) => {
      //   const existingItem = draft.find((si) => si.id === item.id);
      //   if (existingItem) {
      //     existingItem.quantity = item.quantity;
      //   }
      // })

      // manual update
      // for each item, if this is the updated one return a NEW, else return this (existing).
      shoppingList.map((si) => {
        return si.id === item.id ? { ...si, quantity: item.quantity } : si;
      })
    );
  }

  function removeItemFromShoppingList(item: ShoppingItem) {
    // update state, manual
    // filter out array element, which has the same id as the argument
    setShoppingList(shoppingList.filter((si) => si.id != item.id));
  }

  function filterByCategory(category: string) {
    return category === "all"
      ? shoppingList
      : shoppingList.filter((item) => item.category === category);
  }

  function calculateTotal() {
    const filteredList = filterByCategory(category);
    return filteredList.reduce((acc, item) => acc + item.quantity, 0);
    //setTotal();
  }

  return (
    <>
      <h1>Simple Shopping Cart</h1>
      <select
        name="category"
        onChange={(event) => {
          setCategory(event.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="dairy">Dairy</option>
        <option value="snacks">Snacks</option>
        <option value="bakery">Bakery</option>
      </select>

      <h3>Total quantity: {total}</h3>

      {filteredList.map((item) => (
        <ShoppingCartItem
          key={item.id}
          item={item}
          onUpdate={updateShoppingList}
          onDelete={removeItemFromShoppingList}
        />
      ))}
    </>
  );
}
