import { Persistency } from './persistency';

const createSut = () => new Persistency();

describe('Testing persistency class', () => {
  afterEach(() => jest.clearAllMocks());

  it('should return undefined', () => {
    const sut = createSut();

    expect(sut.saveOrder()).toBeUndefined();
  });

  it('should call console.log once', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toBeCalledTimes(1);
    expect(sut.saveOrder()).toBeUndefined();
  });

  it('should call console.log with "Order has been saved successfully"', () => {
    const sut = createSut();
    const consoleSpy = jest.spyOn(console, 'log');
    sut.saveOrder();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Order has been saved successfully',
    );
    expect(sut.saveOrder()).toBeUndefined();
  });
});
