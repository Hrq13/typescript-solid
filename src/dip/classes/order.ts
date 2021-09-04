import { OrderStatus } from './interfaces/order-status';
import { CustomerOrder } from './interfaces/customer-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { MessagingProtocol } from './interfaces/messasing-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';

  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistency: PersistencyProtocol,
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
