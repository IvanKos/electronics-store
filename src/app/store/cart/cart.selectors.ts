import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';
import { Product } from '../../interfaces/product';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectAddedProducts = createSelector(
  selectCartState,
  (state: CartState): Product[] => Object.values(state.productsMap)
);

export const selectAddedProductsCount = createSelector(
  selectCartState,
  (state: CartState): number => Object.values(state.productsMap).length
);

export const selectAddedProductsMap = createSelector(
  selectCartState,
  (state: CartState): Record<number, Product> => state.productsMap
);
