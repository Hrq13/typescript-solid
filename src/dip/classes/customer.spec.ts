import { IndividualCustomer, EnterpriseCustomer } from './customer';

const createIndCustomer = (
  firstName: string,
  lastName: string,
  cpf: string,
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};

const createEntCustomer = (name: string, cnpj: string): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

describe('Individual costumer', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have property firstName, lastName and cpf', () => {
    const sut = createIndCustomer('Henrique', 'Miranda', '485.928.741-95');
    expect(sut).toHaveProperty('firstName', 'Henrique');
    expect(sut).toHaveProperty('lastName', 'Miranda');
    expect(sut).toHaveProperty('cpf', '485.928.741-95');
  });

  it('should have methods getName and getIDN', () => {
    const sut = createIndCustomer('Henrique', 'Miranda', '485.928.741-95');
    expect(sut.getName()).toBe('Henrique Miranda');
    expect(sut.getIDN()).toBe('485.928.741-95');
  });
});

describe('Enterprise costumer', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have property name and cnpj', () => {
    const sut = createEntCustomer('Company S.A', '164.841.368-95');
    expect(sut).toHaveProperty('name', 'Company S.A');
    expect(sut).toHaveProperty('cnpj', '164.841.368-95');
  });

  it('should have methods getName and getIDN', () => {
    const sut = createEntCustomer('Company S.A', '164.841.368-95');
    expect(sut.getName()).toBe('Company S.A');
    expect(sut.getIDN()).toBe('164.841.368-95');
  });
});
