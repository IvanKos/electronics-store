import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { addToCart } from './cart.actions';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      tap(({ product }) => {
          console.log(`${product.name} added to cart`);
        }
      )
    ),
    { functional: true, dispatch: false }
  );
}
