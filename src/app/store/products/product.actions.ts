import { createAction, props } from '@ngrx/store';
import { Product, ProductsFilter } from '../../interfaces/product';

export const loadProducts = createAction('[Product] Load Products');

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>()
);

export const filterProducts = createAction(
  '[Product] Filter Products',
  props<{ filter: ProductsFilter }>()
);
