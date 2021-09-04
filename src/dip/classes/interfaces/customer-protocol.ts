export interface CustomerOrder {
  getName(): string;
  getIDN(): string;
}

export interface IndividualCustomerProtocol extends CustomerOrder {
  firstName: string;
  lastName: string;
  cpf: string;
}

export interface EnterpriseCustomerProtocol extends CustomerOrder {
  name: string;
  cnpj: string;
}
