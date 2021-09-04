describe('Primitive values', () => {
  it('should test jest assertions', () => {
    const number = 10;

    expect(number).toBe(10);
    expect(number).toEqual(10);

    expect(number).toBeTruthy();
    expect(number).not.toBeFalsy();

    expect(number).toBeGreaterThan(9);
    expect(number).toBeGreaterThanOrEqual(10);
    expect(number).toBeLessThan(11);
    expect(number).toBeLessThanOrEqual(10);

    expect(number).toBeCloseTo(10, 2);
    expect(number).toBeCloseTo(9.996);

    expect(number).not.toBeNull();

    expect(number).toHaveProperty('toString');
  });
});

describe('Objects', () => {
  it(`should test jest ssertions with objects`, () => {
    const person = { name: 'Rick', age: 21 };
    const anotherPerson = { name: 'Luiz', age: 30 };

    expect(person).toHaveProperty('name');
    expect(person).toHaveProperty('age');
    expect(person).not.toHaveProperty('cnpj');
    expect(anotherPerson).toHaveProperty('name');
    expect(anotherPerson).toHaveProperty('age');
  });
});
