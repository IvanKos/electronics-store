import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { CommonModule } from '@angular/common';
import { select, Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
import { selectAddedProductsMap } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-product-modal',
  imports: [
    CommonModule,
    StarRatingComponent
  ],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.scss'
})
export class ProductModalComponent implements OnInit {
  store: Store = inject(Store);
  bsModalRef: BsModalRef = inject(BsModalRef);

  @Input() product!: Product;
  selectedProductsMap: Record<number, Product> = {};

  ngOnInit(): void {
    this.store.pipe(select(selectAddedProductsMap)).subscribe((selectedProductsMap) => {
      this.selectedProductsMap = selectedProductsMap;
    });
  }

  close() {
    this.bsModalRef.hide();
  }

  addToCart() {
    this.store.dispatch(addToCart({ product: this.product }));
    this.close();
  }
}
