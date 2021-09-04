import { PersistencyProtocol } from '../classes/interfaces/persistency-protocol';

export class Persistency implements PersistencyProtocol {
  saveOrder(): void {
    console.log('Order has been saved successfully');
  }
}
