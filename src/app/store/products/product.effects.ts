import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );
}
