import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { ProductCategories } from '../../enums/product-categories';
import { filterProducts } from '../../store/products/product.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-filter-sidebar',
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterSidebarComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  store: Store = inject(Store);

  filterForm!: FormGroup;
  productCategories = Object.entries(ProductCategories).map(([key, value]) => ({
    key,
    name: value
  }));

  ngOnInit() {
    this.initFilterForm();
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
        price: { min: minPrice, max: maxPrice }
      }
    }))
  }
}
