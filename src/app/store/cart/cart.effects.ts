import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { addToCart } from './cart.actions';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private toast = inject(ToastrService);

  addToCart$ = createEffect(() =>
      this.actions$.pipe(
        ofType(addToCart),
        tap(({ product }) => {
            this.toast.success(`${product.name} added to cart!`);
          }
        )
      ),
    { functional: true, dispatch: false }
  );
}
