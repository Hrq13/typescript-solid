import { CartItem } from './cart-item';

export interface ShoppingCartProtocol {
  items: Readonly<CartItem[]>;
  total: number;
  totalWithDiscount: number;
  addItem(item: CartItem): void;
  removeItem(index: number): void;
  isEmpty(): boolean;
  clear(): void;
}
