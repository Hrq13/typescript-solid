/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartItem } from './interfaces/cart-item';
import { CustomerOrder } from './interfaces/customer-protocol';
import { MessagingProtocol } from './interfaces/messasing-protocol';
import { PersistencyProtocol } from './interfaces/persistency-protocol';
import { ShoppingCartProtocol } from './interfaces/shopping-cart-protocol';
import { Order } from './order';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): readonly CartItem[] {
    return [];
  }
  get total(): number {
    return this.items.length;
  }
  get totalWithDiscount(): number {
    return 0;
  }
  addItem(item: CartItem): void {
    //
  }
  removeItem(index: number): void {
    //
  }
  isEmpty(): boolean {
    return false;
  }
  clear(): void {
    //
  }
}

class MessagingMock implements MessagingProtocol {
  sendMessage(message: string): void {
    //
  }
  sendAlert(alert: string): void {
    //
  }
}

class PersistencyMock implements PersistencyProtocol {
  saveOrder(): void {
    //
  }
}
class CustomerMock implements CustomerOrder {
  getName(): string {
    return '';
  }
  getIDN(): string {
    return '';
  }
}

const createSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistencyMock = new PersistencyMock();
  const customerMock = new CustomerMock();
  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistencyMock,
    customerMock,
  );
  return {
    sut,
    shoppingCartMock,
    messagingMock,
    persistencyMock,
  };
};

describe('Order', () => {
  afterEach(() => jest.clearAllMocks());

  it('should not checkout if cart is empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(true);

    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('open');
  });

  it('should checkout if cart is not empty', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);

    sut.checkout();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send message on checkout', () => {
    const { sut, messagingMock } = createSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkout();
    expect(messagingMockSpy).toHaveBeenCalledTimes(2);
  });

  it('should save order on checkout', () => {
    const { sut, persistencyMock } = createSut();
    const persistencyMockSpy = jest.spyOn(persistencyMock, 'saveOrder');
    sut.checkout();
    expect(persistencyMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart on checkout', () => {
    const { sut, shoppingCartMock } = createSut();
    const shoppingCartMockspy = jest.spyOn(shoppingCartMock, 'clear');
    sut.checkout();
    expect(shoppingCartMockspy).toHaveBeenCalledTimes(1);
  });
});
