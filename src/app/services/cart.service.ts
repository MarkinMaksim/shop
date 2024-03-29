import { Injectable } from '@angular/core';
import { of, Subject } from 'rxjs';
import { CartModel } from '../components/models/cart-model';
import { ProductModel } from '../components/models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsToBuy: CartModel[] = [];
  totalCost: number = 0;
  totalQuantity: number = 0;
  //private cartItems = new Subject<CartModel[]>();
  public cartItems$ = of(this.productsToBuy);

  addProduct(product: ProductModel): void {
    const existingProduct = this.productsToBuy.find(x => x.name === product.name);

    if (existingProduct) {
      existingProduct.count++;
    } else {
      const cartModel = new CartModel(product, 1)
      this.productsToBuy = [...this.productsToBuy, cartModel];
    }
    this.totalCost += product.price;
    this.totalQuantity += 1;

    //this.cartItems.next(this.productsToBuy);
    this.cartItems$ = of(this.productsToBuy);
  }

  onQuantityIncrease(cartModel: CartModel) {
    const existingProduct = this.productsToBuy.find(x => x.name === cartModel.name);

    this.changeQuantity(cartModel, 1);

    //this.cartItems.next(this.productsToBuy);
    this.cartItems$ = of(this.productsToBuy);
  }

  onQuantityDecrease(cartModel: CartModel) {
    const existingProduct = this.productsToBuy.find(x => x.name === cartModel.name);

    this.changeQuantity(cartModel, -1);

    //this.cartItems.next(this.productsToBuy);
    this.cartItems$ = of(this.productsToBuy);

  }

  changeQuantity(cartModel: CartModel, quantity: number) {
    const existingProduct = this.productsToBuy.find(x => x.name === cartModel.name);
    const existingProductIndex = this.productsToBuy.findIndex(x => x.name === cartModel.name);

    if (existingProduct) {

      if (existingProduct.count === 1 && quantity < 0) {
        this.deleteItem(cartModel);
      } else {
        existingProduct.count += quantity
        this.productsToBuy = [...this.productsToBuy.slice(0, existingProductIndex), existingProduct, ...this.productsToBuy.slice(existingProductIndex + 1)]
      }

      this.totalQuantity += quantity;
      this.totalCost += existingProduct.price * quantity;
    }
  }

  deleteItem(cartItem: CartModel) {
    const existingProductIndex = this.productsToBuy.findIndex(x => x.name === cartItem.name);

    if (existingProductIndex !== -1) {
      this.productsToBuy = [...this.productsToBuy.slice(0, existingProductIndex), ...this.productsToBuy.slice(existingProductIndex + 1)];
    }

    this.totalCost -= cartItem.price * cartItem.count;
    this.totalQuantity -= cartItem.count;

    //this.cartItems.next(this.productsToBuy);
    this.cartItems$ = of(this.productsToBuy);

  }

  getProductsInCart(): CartModel[] {
    return this.productsToBuy;
  }

  getCartSummary(): [number, number] {
    return [this.totalCost, this.totalQuantity];
  }

  getTotalCost(): number {
    return this.totalCost;
  }

  getTotalQuantity(): number {
    return this.totalQuantity;
  }

  removeAllProducts() {
    this.productsToBuy = [];

    //this.cartItems.next(this.productsToBuy);
    this.cartItems$ = of(this.productsToBuy);

  }

  isEmptyCart(): boolean {
    return this.productsToBuy.length === 0;
  }
}
