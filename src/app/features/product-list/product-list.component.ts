import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { Product } from '../../interfaces/product';
import { StarRatingComponent } from '../../components/star-rating/star-rating.component';
import { Store } from '@ngrx/store';
import { loadProducts } from '../../store/products/product.actions';
import { selectFilteredProducts } from '../../store/products/product.selectors';
import { ReactiveFormsModule } from '@angular/forms';
import { addToCart } from '../../store/cart/cart.actions';
import { selectAddedProductsMap } from '../../store/cart/cart.selectors';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ProductModalComponent } from '../../components/product-modal/product-modal.component';
import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
import { CurrencyPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  imports: [StarRatingComponent, ReactiveFormsModule, FilterSidebarComponent, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  private store: Store = inject(Store);
  private modalService: BsModalService = inject(BsModalService);

  private selectFilteredProducts$ = this.store.select(selectFilteredProducts).pipe(takeUntilDestroyed());
  private selectAddedProductsMap$ = this.store.select(selectAddedProductsMap).pipe(takeUntilDestroyed());
  private readonly itemsPerPage: number = 9;
  protected products = signal<Product[]>([]);
  protected selectedProductsMap = signal<Record<number, Product>>({});
  protected currentPage = signal<number>(1);
  protected paginatedProducts = computed<Product[]>(() => this.getPaginatedProducts());
  protected totalPages = computed<number>(() => Math.ceil(this.products().length / this.itemsPerPage));

  ngOnInit() {
    this.store.dispatch(loadProducts());

    this.setProducts();
    this.setSelectedProductsMap();
  }

  private setProducts() {
    this.selectFilteredProducts$.subscribe((products) => {
      this.products.set(products);
    });
  }

  private setSelectedProductsMap() {
    this.selectAddedProductsMap$.subscribe((selectedProductsMap) => {
      this.selectedProductsMap.set(selectedProductsMap);
    });
  }

  private getPaginatedProducts() {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.products().slice(start, end);
  }

  addToCart(event: Event, product: Product) {
    event.stopPropagation();
    this.store.dispatch(addToCart({ product }));
  }

  openProductModal(product: Product) {
    this.modalService.show(ProductModalComponent, {
      initialState: { product },
      class: 'modal-md'
    });
  }

  changePage(page: number) {
    this.currentPage.set(page);
  }
}
