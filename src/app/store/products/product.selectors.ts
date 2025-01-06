import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectFilteredProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.filteredProducts
);

export const selectProductError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);
