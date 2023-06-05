import { useState } from "react";
import { BsPlusCircle, BsDashCircle } from "react-icons/bs";
import { ShoppingItem } from "../models/Shop";

export default function ShoppingCartItem({
  item,
  onUpdate,
}: {
  item: ShoppingItem;
  onUpdate(item: ShoppingItem): void;
}) {
  const [shoppingItem, setShoppingItem] = useState(item);

  const increase = () => {
    // immutable state - create an altered copy
    const newShoppingItem = {
      ...shoppingItem,
      quantity: shoppingItem.quantity + 1,
    };
    setShoppingItem(newShoppingItem);

    // notify parent - ShoppingItem with updated quantity
    console.log("Notify parent:", newShoppingItem);
    onUpdate(newShoppingItem);
  };

  const decrease = () => {
    // immutable state - create an altered copy
    const newShoppingItem = {
      ...shoppingItem,
      quantity: shoppingItem.quantity > 0 ? shoppingItem.quantity - 1 : 0,
    };

    // Setting state immutable, update quantity property only.
    setShoppingItem(newShoppingItem);

    // notify parent - ShoppingItem with updated quantity
    console.log("Notify parent:", newShoppingItem);
    onUpdate(newShoppingItem);
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-3 gap-1">
      <span>{item.title} </span>
      <button onClick={decrease} className="btn">
        <BsDashCircle />
      </button>

      <span>{shoppingItem.quantity}</span>
      <button onClick={increase} className="btn">
        <BsPlusCircle />
      </button>
    </div>
  );
}
