import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBreadcrumbComponent } from 'src/app/core/nav-breadcrumb/nav-breadcrumb.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CommonModule, NavBreadcrumbComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCartComponent {}
