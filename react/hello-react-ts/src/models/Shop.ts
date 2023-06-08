export interface ShoppingItem {
  id: number;
  title: string;
  quantity: number;
  category?: "dairy" | "bakery" | "snacks";
}
