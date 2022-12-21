import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductModel } from '../models/product-model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  // private cartService: CartService;


  constructor(private cartService: CartService) {
    // this.cartService = service;
  }

  ngOnInit(): void {
  }

  checkProductsInCart(): boolean {
    return this.cartService.getProductsInCart().length > 0;
  }

  getProductsInCart(): ProductModel[] {
    return this.cartService.getProductsInCart();
  }

  trackByMethod(index:number, el:any): number {
    return el.id; // у модели нет этого поля
  }
}
