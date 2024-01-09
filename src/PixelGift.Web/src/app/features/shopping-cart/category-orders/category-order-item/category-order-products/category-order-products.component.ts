import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderProductItemComponent } from './order-product-item/order-product-item.component';

@Component({
  selector: 'app-category-order-products',
  standalone: true,
  imports: [CommonModule, OrderProductItemComponent],
  templateUrl: './category-order-products.component.html',
  styleUrl: './category-order-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryOrderProductsComponent {}
