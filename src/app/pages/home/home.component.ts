import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { select, Store } from '@ngrx/store';
import { filterProducts, loadProducts } from '../../store/products/product.actions';
import { selectFilteredProducts } from '../../store/products/product.selectors';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { addToCart } from '../../store/cart/cart.actions';
import { selectAddedProductsMap } from '../../store/cart/cart.selectors';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, StarRatingComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  store: Store = inject(Store);
  formBuilder: FormBuilder = inject(FormBuilder);
  modalService: BsModalService = inject(BsModalService);

  products: Product[] = [];
  filterForm!: FormGroup;
  bsModalRef?: BsModalRef;
  selectedProductsMap: Record<number, Product> = {};

  productCategories = [
    { name: "Phones", key: "phones" },
    { name: "TVs", key: "tv" }
  ]


  ngOnInit() {
    this.initFilterForm();
    this.store.dispatch(loadProducts());

    this.store.pipe(select(selectFilteredProducts)).subscribe((products) => {
      this.products = products;

      console.log('selectFilteredProducts', products);
    });

    this.store.pipe(select(selectAddedProductsMap)).subscribe((selectedProductsMap) => {
      this.selectedProductsMap = selectedProductsMap;
    });
  }

  initFilterForm() {
    this.filterForm = this.formBuilder.group({
      name: [''],
      category: [''],
      minPrice: [null],
      maxPrice: [null]
    });
  }

  applyFilters() {
    const { name, category, minPrice, maxPrice } = this.filterForm.value;

    this.store.dispatch(filterProducts({
      filter: {
        name,
        category,
        price: {min: minPrice, max: maxPrice}
      }
    }))
  }

  addToCart(event: Event, product: Product) {
    event.stopPropagation();
    this.store.dispatch(addToCart({ product }));
  }

  openProductModal(product: Product) {
    this.bsModalRef = this.modalService.show(ProductModalComponent, {
      initialState: { product },
      class: 'modal-lg'
    });
  }
}
