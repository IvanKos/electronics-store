import { Product, ProductsFilter } from '../../interfaces/product';
import { createReducer, on } from '@ngrx/store';
import { filterProducts, loadProductsFailure, loadProductsSuccess } from './product.actions';
import * as utils from './product.utils';

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
  filter: ProductsFilter;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  filter: {},
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    filteredProducts: utils.filterProducts(products, state.filter),
    error: null,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(filterProducts, (state, { filter }) => ({
    ...state,
    filteredProducts: utils.filterProducts(state.products, filter)
  }))
);
