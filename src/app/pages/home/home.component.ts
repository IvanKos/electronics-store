import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { select, Store } from '@ngrx/store';
import { loadProducts } from '../../store/product.actions';
import { selectAllProducts, selectProductError } from '../../store/product.selectors';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, StarRatingComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productService: ProductService = inject(ProductService);
  store: Store = inject(Store);
  formBuilder: FormBuilder = inject(FormBuilder);

  productsOriginal: Product[] = [];
  products: Product[] = [];
  filterForm!: FormGroup;

  productCategories = [
    {name: "Phones", key: "phones"},
    {name: "TVs", key: "tv"}
  ]


  ngOnInit() {
    // this.productService.getProducts().subscribe((products: Product[]) => {
    //   this.products = products;
    //
    //   console.log('products', this.products);
    // })

    this.initFilterForm();

    this.store.dispatch(loadProducts());

    this.store.pipe(select(selectAllProducts)).subscribe((products) => {
      this.productsOriginal = products;
      console.log('this.productsOriginal', this.productsOriginal);
    });

    this.store.pipe(select(selectProductError)).subscribe((error) => {
      if (error) {
        console.error('Error loading products:', error);
      }
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

      this.products = this.productsOriginal.filter(product => {
        const matchesName = name ? product.name.toLowerCase().includes(name.toLowerCase()) : true;
        const matchesCategory = category ? product.category === category : true;
        const matchesMinPrice = minPrice ? product.price >= minPrice : true;
        const matchesMaxPrice = maxPrice ? product.price <= maxPrice : true;
        return matchesName && matchesCategory && matchesMinPrice && matchesMaxPrice;
      });

  }
}
