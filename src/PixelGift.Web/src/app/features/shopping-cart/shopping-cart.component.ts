import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBreadcrumbComponent } from 'src/app/core/nav-breadcrumb/nav-breadcrumb.component';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Router, RouterOutlet } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderPreviewComponent } from './order-preview/order-preview.component';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [
    CommonModule,
    NavBreadcrumbComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent {

}
