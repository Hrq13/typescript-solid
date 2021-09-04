/*
Open-closed principle
*/

import { Order } from './classes/order';
import { ShoppingCart } from './classes/shopping-cart';
import { Messaging } from './services/messaging';
import { Persistency } from './services/persistency';
import { Product } from './classes/product';
import { NoDiscount, TenPercentDiscount } from './classes/discount';

// const fiftyPercentDiscount = new FiftyPercentDiscount();
const tenPercentDiscount = new TenPercentDiscount();
const noDiscount = new NoDiscount();
const shoppingCart = new ShoppingCart(tenPercentDiscount);
const messaging = new Messaging();
const persistency = new Persistency();
const order = new Order(shoppingCart, messaging, persistency);

shoppingCart.addItem(new Product('Condom', 49.9));
shoppingCart.addItem(new Product('Laptop', 209.95));
shoppingCart.addItem(new Product('TV', 150));

console.log(shoppingCart.items);
console.log(shoppingCart.total);
console.log(`total with discount: ${shoppingCart.totalWithDiscount}`);

console.log(order.orderStatus);

order.checkout();
console.log(order.orderStatus);
