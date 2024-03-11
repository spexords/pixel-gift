import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProductItemComponent } from './order-product-item/order-product-item.component';
import { OrderProductHeaderComponent } from './order-product-header/order-product-header.component';
import { OrderItem } from 'src/app/features/admin/admin-panel/models';

@Component({
  selector: 'app-category-order-products',
  standalone: true,
  imports: [
    CommonModule,
    OrderProductHeaderComponent,
    OrderProductItemComponent,
  ],
  templateUrl: './category-order-products.component.html',
  styleUrl: './category-order-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryOrderProductsComponent {
  @Input({required: true}) orderItems!: OrderItem[]; 
}
