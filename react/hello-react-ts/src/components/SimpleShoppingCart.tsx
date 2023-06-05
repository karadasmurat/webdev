import { useState } from "react";
import ShoppingCartItem from "./ShoppingCartItem";
import { ShoppingItem } from "../models/Shop";
import { produce } from "immer";

export default function SimpleShoppingCart() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: 1, title: "item 1", quantity: 11 },
    { id: 2, title: "item 2", quantity: 22 },
  ]);

  const total = calculateTotal();

  function updateShoppingList(item: ShoppingItem) {
    setShoppingList(
      // using immer
      produce(
        (draft) => {
          const existingItem = draft.find((si) => si.id === item.id);
          if (existingItem) {
            existingItem.quantity = item.quantity;
          }
        }

        // manual update
        // for each item, if found return a new, else return existing.
        //   shoppingList.map((si) => {
        //     if (si.id === item.id) {
        //       return { ...si, quantity: item.quantity };
        //     }
        //     return si;
        //   }
      )
    );
  }
  function calculateTotal() {
    return shoppingList.reduce((acc, item) => acc + item.quantity, 0);
    //setTotal();
  }

  return (
    <>
      <h1>Simple Shopping Cart</h1>
      <h3>Total quantity: {total}</h3>
      {shoppingList.map((item) => (
        <ShoppingCartItem
          key={item.id}
          item={item}
          onUpdate={updateShoppingList}
        />
      ))}
    </>
  );
}
