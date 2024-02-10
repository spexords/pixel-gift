import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartService } from 'src/app/features/shopping-cart/shopping-cart.service';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, LetDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private shoppingCartService = inject(ShoppingCartService);

  itemsCount$ = this.shoppingCartService.basketItemsCount$;
}
