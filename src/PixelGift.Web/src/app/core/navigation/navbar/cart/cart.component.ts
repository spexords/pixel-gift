import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { Store } from '@ngrx/store';
import { BasketSelectors } from 'src/app/core/basket/state/basket.selectors';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private store = inject(Store);
  itemsCount$ = this.store.select(BasketSelectors.selectItemsCount);
}
