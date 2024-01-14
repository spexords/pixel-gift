import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryOrderFormComponent } from './category-order-form/category-order-form.component';
import { CategoryOrderProductsComponent } from './category-order-products/category-order-products.component';
import { OrderCategory } from 'src/app/core/models';

@Component({
  selector: 'app-category-order-item',
  standalone: true,
  imports: [
    CommonModule,
    CategoryOrderFormComponent,
    CategoryOrderProductsComponent,
  ],
  templateUrl: './category-order-item.component.html',
  styleUrl: './category-order-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryOrderItemComponent {
  @Input({required: true}) orderCategory!: OrderCategory; 
}
