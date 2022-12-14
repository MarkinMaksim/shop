import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartModel } from '../../models/cart-model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartModel: CartModel = {
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
    isAvalible: false,
    count: 0
  };

  @Output()
  deleteItem: EventEmitter<CartModel> = new EventEmitter<CartModel>();
  @Output()
  quantityIncrease: EventEmitter<CartModel> = new EventEmitter<CartModel>();
  @Output()
  quantityDecrease: EventEmitter<CartModel> = new EventEmitter<CartModel>();

  ngOnInit(): void {
  }

  onDeleteFromCart(): void {
    this.deleteItem.emit(this.cartModel);
  }

  onQuantityIncrease(): void {
    this.quantityIncrease.emit(this.cartModel);
  }

  onQuantityDecrease(): void {
    this.quantityDecrease.emit(this.cartModel);
  }
}
