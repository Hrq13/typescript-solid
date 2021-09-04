/*
Dependency inversion principle
modulos de alto nivel não devem depender de modulos de baixo nível, ambos devem depender de abstrações
abstrações, não implementações.
abstrações não devem depender de detalhes. Detalhes devem depender de abstrações
*/

import { Order } from './classes/order';
import { ShoppingCart } from './classes/shopping-cart';
import { Messaging } from './services/messaging';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { TenPercentDiscount } from './classes/discount';
import { EnterpriseCustomer } from './classes/customer';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
// const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(tenPercentDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const enterpriseCustomer = new EnterpriseCustomer(
  'Enjoei S.A',
  '654.874.856.471-58',
);

const order = new Order(
  shoppingCart,
  messaging,
  persistency,
  enterpriseCustomer,
);

shoppingCart.addItem(new Product('Condom', 49.9));
shoppingCart.addItem(new Product('Laptop', 209.95));
shoppingCart.addItem(new Product('TV', 150));

console.log(shoppingCart.items);
console.log(shoppingCart.total);
console.log(`total with discount: ${shoppingCart.totalWithDiscount}`);
console.log(order.orderStatus);

order.checkout();

console.log(order.orderStatus);
