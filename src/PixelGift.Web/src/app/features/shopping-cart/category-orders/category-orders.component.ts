import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryOrderItemComponent } from './category-order-item/category-order-item.component';

@Component({
  selector: 'app-category-orders',
  standalone: true,
  imports: [CommonModule, CategoryOrderItemComponent],
  templateUrl: './category-orders.component.html',
  styleUrl: './category-orders.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryOrdersComponent {}
