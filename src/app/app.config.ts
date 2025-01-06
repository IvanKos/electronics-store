import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { productReducer } from './store/products/product.reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductEffects } from './store/products/product.effects';
import { cartReducer } from './store/cart/cart.reducer';
import { CartEffects } from './store/cart/cart.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    provideStore({
      products: productReducer,
      cart: cartReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(ProductEffects, CartEffects)
  ]
};
