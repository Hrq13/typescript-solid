import { Product } from './product';

describe('Messaging', () => {
  afterEach(() => jest.clearAllMocks());

  const createSut = (name: string, price: number) => new Product(name, price);

  it('should return undefined', () => {
    const sut = createSut('TV', 1200);

    expect(sut.name).toBe('TV');
    expect(sut.price).toBe(1200);
  });
});
