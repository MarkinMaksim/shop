import { Injectable } from '@angular/core';
import { ProductModel } from '../components/models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  productsToBuy: ProductModel[] = [
    { name: 'Чёрное платье', description: 'Чёрное платье', imageUrl: 'https://media.istockphoto.com/id/1186448758/photo/fashionable-women-dress-on-coathanger.jpg?s=612x612&w=is&k=20&c=EVbteUsTVajoFUv9qNTO4TrhBWpetADXX0C9NcoKDAA=', price: 2000 },
    { name: 'Чёрно белое платье', description: 'Чёрно белое платье', imageUrl: 'https://st.depositphotos.com/2002575/3060/i/450/depositphotos_30603871-stock-photo-black-and-white-dress-on.jpg', price: 2000 },
  ];

  addProduct(product: ProductModel): void {
    this.productsToBuy.push(product);
  }

  getProductsInCart(): ProductModel[] {
    return this.productsToBuy;
  }
}
