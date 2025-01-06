import { Product } from '../../interfaces/product';
import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart } from './cart.actions';
import * as utils from './cart.utils';

export interface CartState {
  productsMap: Record<number, Product> ;
}

export const initialState: CartState = {
  productsMap: {}
};

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => ({
    ...state,
    productsMap: {...state.productsMap, [product.id]: product},
  })),
  on(removeFromCart, (state, { productId }) => ({
    ...state,
    productsMap: utils.removeProduct(state.productsMap, productId)
  }))
);
