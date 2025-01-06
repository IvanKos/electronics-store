import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { select, Store } from '@ngrx/store';
import { filterProducts, loadProducts } from '../../store/products/product.actions';
import { selectAllProducts, selectFilteredProducts } from '../../store/products/product.selectors';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { addToCart } from '../../store/cart/cart.actions';
import { selectAddedProductsMap } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-home',
  imports: [CommonModule, StarRatingComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  store: Store = inject(Store);
  formBuilder: FormBuilder = inject(FormBuilder);

  // productsOriginal: Product[] = [];
  products: Product[] = [];
  filterForm!: FormGroup;
  selectedProductsMap: Record<number, Product> = {};

  productCategories = [
    { name: "Phones", key: "phones" },
    { name: "TVs", key: "tv" }
  ]


  ngOnInit() {
    this.initFilterForm();

    this.store.dispatch(loadProducts());

    // this.store.pipe(select(selectAllProducts)).subscribe((products) => {
    //   // this.productsOriginal = products;
    //   this.products = products;
    //   console.log('selectAllProducts', products);
    // });

    this.store.pipe(select(selectFilteredProducts)).subscribe((products) => {
      this.products = products;

      console.log('selectFilteredProducts', products);
    });

    this.store.pipe(select(selectAddedProductsMap)).subscribe((selectedProductsMap) => {
      this.selectedProductsMap = selectedProductsMap;
      console.log('selectedProductsMap', this.selectedProductsMap);
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


    console.log('applyFilters');

    this.store.dispatch(filterProducts({
      filter: {
        name,
        category,
        price: {min: minPrice, max: maxPrice}
      }
    }))
  }

  addToCart(product: Product) {
    this.store.dispatch(addToCart({ product }));
  }
}
