import { Product } from '../interfaces/product';
import { createReducer, on } from '@ngrx/store';
import { loadProductsFailure, loadProductsSuccess } from './product.actions';

export interface ProductState {
  products: Product[];
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    error: null,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
