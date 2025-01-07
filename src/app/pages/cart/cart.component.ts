import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../interfaces/product';
import { selectAddedProducts, selectAddedProductsTotal } from '../../store/cart/cart.selectors';
import { removeFromCart } from '../../store/cart/cart.actions';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    AsyncPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  private store: Store = inject(Store);
  protected cartProducts$: Observable<Product[]> = this.store.select(selectAddedProducts);
  protected total$: Observable<number> = this.store.select(selectAddedProductsTotal);

  removeFromCart(productId: number) {
    this.store.dispatch(removeFromCart({ productId }));
  }
}
