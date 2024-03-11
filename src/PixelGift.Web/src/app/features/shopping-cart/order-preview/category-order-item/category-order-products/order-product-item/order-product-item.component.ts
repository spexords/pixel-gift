import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterButtonComponent } from 'src/app/shared/components/counter-button/counter-button.component';
import { CancelButtonComponent } from 'src/app/shared/components/cancel-button/cancel-button.component';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BasketActions } from 'src/app/core/basket/state';
import { OrderItem } from 'src/app/features/admin/admin-panel/models';

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
  private store = inject(Store);

  @Input({ required: true }) orderItem!: OrderItem;
  @Input() last = false;

  updateOrderItemQuantity(quantity: number): void {
    this.store.dispatch(
      BasketActions.updateItemQuantity({ itemId: this.orderItem.id, quantity }),
    );
  }
}
