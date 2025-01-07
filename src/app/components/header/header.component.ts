import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectAddedProductsCount } from '../../store/cart/cart.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent{
  private store: Store = inject(Store);

  protected cardProductsCount$: Observable<number> = this.store.pipe(select(selectAddedProductsCount));
}
