import { Product } from './product';

const createSut = (name: string, price: number) => {
  return new Product(name, price);
};

describe('Product', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have properties name and price', () => {
    const sut = createSut('TV', 1200);

    expect(sut).toHaveProperty('name', 'TV');
    expect(sut).toHaveProperty('price', 1200);
  });
});
