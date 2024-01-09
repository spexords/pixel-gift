import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBreadcrumbComponent } from 'src/app/core/nav-breadcrumb/nav-breadcrumb.component';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { CategoryOrdersComponent } from './category-orders/category-orders.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    NavBreadcrumbComponent,
    FooterComponent,
    CategoryOrdersComponent,
    OrderSummaryComponent,
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {}
