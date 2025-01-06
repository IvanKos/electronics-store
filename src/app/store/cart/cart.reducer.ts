import { Product } from '../../interfaces/product';
import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart } from './cart.actions';
import * as utils from './cart.utils';

export interface CartState {
  products: Product[];
}

export const initialState: CartState = {
  products: []
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
  })),
  on(removeFromCart, (state, { productId }) => ({
    ...state,
    products: utils.removeProduct(state.products, productId),
  }))
);
