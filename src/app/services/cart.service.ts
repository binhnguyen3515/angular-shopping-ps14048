import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: Product[] = [];
  numberOfItems = new BehaviorSubject<Product[]>([]);
  constructor() {this.loadFromLocalStorage()}

  addItem(product: Product) {
    const exist = this.cartItems.find((cart) => cart.id === product.id);
    if (exist) {
      exist.quantity++;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.saveToLocalStorage();
  }
  updateCart(quantity: number, product: Product) {
    product.quantity = quantity;
    const index = this.cartItems.findIndex((cart) => cart.id === product.id);
    this.cartItems[index] = product;
    console.log({ product: product });
    this.saveToLocalStorage();
  }

  remove(id: number) {
    const index = this.cartItems.findIndex((cart) => cart.id === id);
    this.cartItems.splice(index, 1);
    this.saveToLocalStorage();
  }
  clear() {
    this.cartItems = [];
    this.saveToLocalStorage();
  }
  saveToLocalStorage() {
    this.numberOfItems.next(this.cartItems);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
  loadFromLocalStorage() {
    const json = localStorage.getItem('cart');
    this.cartItems = json ? JSON.parse(json) : [];
    this.numberOfItems.next(this.cartItems);
  }
  get CartItems():Product[]{
    const json = localStorage.getItem('cart');
    return json ? JSON.parse(json) : [];
  }
}
