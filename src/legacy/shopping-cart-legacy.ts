type CartItem = { name: string; price: number };
type OrderStatus = 'open' | 'closed';

export class ShoppingCartLegacy {
  private readonly _items: CartItem[] = [];
  private _orderStatus: OrderStatus = 'open';

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  get total(): number {
    return +this._items
      .reduce((ac: number, i: CartItem) => ac + i.price, 0)
      .toFixed(2);
  }

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.isEmpty()) {
      console.log('Your shopping cart is empty.');
      return;
    }

    this._orderStatus = 'closed';
    this.sendMessage(`Your order of ${this.total} was placed.`);
    this.saveOrder();
    this.clear();
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  sendMessage(message: string): void {
    console.log('Aviso:', message);
  }

  saveOrder(): void {
    console.log('Order has been saved successfully');
  }

  clear(): void {
    console.log('Your shopping cart was cleared...');
    this._items.length = 0;
  }
}

const shoppingCart = new ShoppingCartLegacy();

shoppingCart.addItem({ name: 'Condom', price: 49.9 });
shoppingCart.addItem({ name: 'Laptop', price: 209.95 });
shoppingCart.addItem({ name: 'TV', price: 150 });
shoppingCart.checkout();
console.log(shoppingCart.orderStatus);
console.log(shoppingCart.items);
console.log(shoppingCart.total);
