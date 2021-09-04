import {
  Discount,
  NoDiscount,
  FiftyPercentDiscount,
  TenPercentDiscount,
} from './discount';
import { CartItem } from './interfaces/cart-item';
import { ShoppingCart } from './shopping-cart';

const createDiscount = (discount: new () => Discount): Discount => {
  return new discount();
};

const createShoppingCart = (discount: Discount): ShoppingCart => {
  return new ShoppingCart(discount);
};

const createCartItem = (name: string, price: number): CartItem => {
  class NewCartItem implements CartItem {
    constructor(public name: string, public price: number) {}
  }

  return new NewCartItem(name, price);
};

const createCartItemWithProducts = (_discount: new () => Discount) => {
  const discount = createDiscount(_discount);
  const cartItem = createCartItem('TV', 2100);
  const cartItem2 = createCartItem('Laptop', 2260);
  const sut = createShoppingCart(discount);
  sut.addItem(cartItem);
  sut.addItem(cartItem2);
  return { sut, discount };
};

describe('ShoppingCart', () => {
  afterEach(() => jest.clearAllMocks());

  it('should initialize with an empty cart', () => {
    const discount = createDiscount(NoDiscount);
    const sut = createShoppingCart(discount);
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should have 2 items in the cart', () => {
    const { sut } = createCartItemWithProducts(NoDiscount);

    expect(sut.isEmpty()).toBe(false);
    expect(sut.items.length).toBe(2);
  });

  it('should test total and total with no discount', () => {
    const { sut, discount } = createCartItemWithProducts(NoDiscount);
    const discountMockSpy = jest.spyOn(discount, 'calculate');

    expect(sut.total).toBe(4360);
    expect(sut.totalWithDiscount).toBe(sut.total);
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should test total and total with a 10-percent discount', () => {
    const { sut, discount } = createCartItemWithProducts(TenPercentDiscount);
    const discountMockSpy = jest.spyOn(discount, 'calculate');

    expect(sut.total).toBe(4360);
    expect(sut.totalWithDiscount).toBe(4360 - 4360 * 0.1);
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should test total and total with a 50-percent discount', () => {
    const { sut, discount } = createCartItemWithProducts(FiftyPercentDiscount);
    const discountMockSpy = jest.spyOn(discount, 'calculate');

    expect(sut.total).toBe(4360);
    expect(sut.totalWithDiscount).toBe(2180);
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should add products and clear cart', () => {
    const { sut } = createCartItemWithProducts(NoDiscount);

    expect(sut.items.length).toBe(2);
    sut.clear();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should delete products from cart', () => {
    const { sut } = createCartItemWithProducts(NoDiscount);

    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    expect(sut.total).toBe(2100);
    sut.removeItem(0);
    expect(sut.items.length).toBe(0);
    expect(sut.total).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });
});
