import { ShoppingCart } from './shopping-cart';
import { OrderStatus } from './interfaces/order-status';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkout(): void {
    if (this.cart.isEmpty()) {
      this.messaging.sendMessage('Your shopping cart is empty.');
      return;
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Your order of ${this.cart.totalWithDiscount} was placed.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
