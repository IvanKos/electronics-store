import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
import { selectAddedProductsMap } from '../../store/cart/cart.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-modal',
  imports: [
    CommonModule,
    StarRatingComponent
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductModalComponent {
  private store: Store = inject(Store);
  private bsModalRef: BsModalRef = inject(BsModalRef);

  @Input() product!: Product;
  selectedProductsMap$: Observable<Record<number, Product>> = this.store.select(selectAddedProductsMap);

  close() {
    this.bsModalRef.hide();
  }

  addToCart() {
    this.store.dispatch(addToCart({ product: this.product }));
    this.close();
  }
}
