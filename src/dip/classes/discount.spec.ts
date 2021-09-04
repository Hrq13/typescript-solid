import {
  Discount,
  FiftyPercentDiscount,
  NoDiscount,
  TenPercentDiscount,
} from './discount';

const createSut = (className: new () => Discount) => {
  return new className();
};

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have no discount', () => {
    const sut = createSut(NoDiscount);
    expect(sut.calculate(10.99)).toBe(10.99);
  });
  it('should have 10 percent discount', () => {
    const sut = createSut(TenPercentDiscount);
    expect(sut.calculate(163.14)).toBe(163.14 - 163.14 * 0.1);
  });
  it('should have no discount', () => {
    const sut = createSut(FiftyPercentDiscount);
    expect(sut.calculate(47.85)).toBe(47.85 - 47.85 * 0.5);
  });
});
