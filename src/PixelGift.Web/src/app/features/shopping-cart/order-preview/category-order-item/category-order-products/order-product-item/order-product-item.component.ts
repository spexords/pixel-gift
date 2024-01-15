import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterButtonComponent } from 'src/app/shared/components/counter-button/counter-button.component';
import { CancelButtonComponent } from 'src/app/shared/components/cancel-button/cancel-button.component';
import { OrderItem } from 'src/app/core/models';
import { FormsModule } from '@angular/forms';
import { ShoppingCartService } from 'src/app/features/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-order-product-item',
  standalone: true,
  imports: [
    CommonModule,
    CounterButtonComponent,
    CancelButtonComponent,
    FormsModule,
  ],
  templateUrl: './order-product-item.component.html',
  styleUrl: './order-product-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderProductItemComponent {
  private shoppingCartService = inject(ShoppingCartService);

  @Input({ required: true }) orderItem!: OrderItem;
  @Input() last = false;

  updateOrderItemQuantity(quantity: number): void {
    this.shoppingCartService.updateItemQuantity(this.orderItem.id, quantity);
  }
}
