import { Component, inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product } from '../../interfaces/product';
import { selectAddedProducts } from '../../store/cart/cart.selectors';
import { removeFromCart } from '../../store/cart/cart.actions';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  store: Store = inject(Store);
  cartProducts: Product[] = [];

  ngOnInit() {
    this.store.pipe(select(selectAddedProducts)).subscribe((products) => {
      this.cartProducts = products;
    });
  }

  removeFromCart(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  getTotal(): number {
    return this.cartProducts.reduce((total, product) => total + product.price, 0);
  }
}
