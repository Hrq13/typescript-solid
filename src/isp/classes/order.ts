import { ShoppingCart } from './shopping-cart';
import { OrderStatus } from './interfaces/order-status';
import { Messaging } from '../services/messaging';
import { Persistency } from '../services/persistency';
import { CustomerOrder } from './interfaces/customer-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCart,
    private readonly messaging: Messaging,
    private readonly persistency: Persistency,
    private readonly customer: CustomerOrder,
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

    this.messaging.sendMessage(`Customer name: ${this.customer.getName()}`);
    this.messaging.sendMessage(
      `Customer identification number: ${this.customer.getIDN()}`,
    );
    this.messaging.sendAlert(
      `Your order of ${this.cart.totalWithDiscount} was placed.`,
    );
    this.persistency.saveOrder();
    this.cart.clear();
  }
}
