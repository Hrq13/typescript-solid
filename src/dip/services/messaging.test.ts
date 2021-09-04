import { Messaging } from './messaging';

describe('Messaging', () => {
  afterEach(() => jest.clearAllMocks());

  const createSut = () => new Messaging();

  it('should return undefined', () => {
    const sut = createSut();

    expect(sut.sendMessage('test message')).toBeUndefined();
  });

  it('should call sendMessage with "test message"', () => {
    const sut = createSut();
    const sutSpy = jest.spyOn(sut, 'sendMessage');
    sut.sendMessage('test message');
    expect(sutSpy).toHaveBeenCalledWith('test message');
  });

  it('should call sendMessage once', () => {
    const sut = createSut();
    const sutSpy = jest.spyOn(sut, 'sendMessage');
    sut.sendMessage('test message');
    expect(sutSpy).toHaveBeenCalledTimes(1);
  });

  it('should return undefined', () => {
    const sut = createSut();

    expect(sut.sendAlert('test alert')).toBeUndefined();
  });

  it('should call sendAlert with "test alert"', () => {
    const sut = createSut();
    const sutSpy = jest.spyOn(sut, 'sendAlert');
    sut.sendAlert('test alert');
    expect(sutSpy).toHaveBeenCalledWith('test alert');
  });

  it('should call sendAlert once', () => {
    const sut = createSut();
    const sutSpy = jest.spyOn(sut, 'sendAlert');
    sut.sendAlert('test alert');
    expect(sutSpy).toHaveBeenCalledTimes(1);
  });
});
