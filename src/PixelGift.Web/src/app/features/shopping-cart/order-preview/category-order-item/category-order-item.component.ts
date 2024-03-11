import {
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryOrderFormComponent } from './category-order-form/category-order-form.component';
import { CategoryOrderProductsComponent } from './category-order-products/category-order-products.component';
import { FormGroup } from '@angular/forms';
import { OrderCategory } from '../../models';

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
})
export class CategoryOrderItemComponent {
  @Input({ required: true }) orderCategory!: OrderCategory;
  @Input({ required: true }) orderCategoryForm!: FormGroup;
}
