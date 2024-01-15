import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryOrderFormComponent } from './category-order-form/category-order-form.component';
import { CategoryOrderProductsComponent } from './category-order-products/category-order-products.component';
import { OrderCategory, PromoCodeRequest } from 'src/app/core/models';
import { ShoppingCartService } from '../../shopping-cart.service';

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
  private shoppingCartService = inject(ShoppingCartService);

  @Input({ required: true }) orderCategory!: OrderCategory;

  onPromoCodeRequestChange(code: string): void {
    this.shoppingCartService.updatePromoCodes(this.orderCategory.id, code);
  }
}
