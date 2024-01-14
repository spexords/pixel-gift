import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBreadcrumbComponent } from 'src/app/core/nav-breadcrumb/nav-breadcrumb.component';
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { CategoryOrdersComponent } from './category-orders/category-orders.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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
export class ShoppingCartComponent {
  private router = inject(Router);
  private shoppingCartService = inject(ShoppingCartService);
  orderPreview$ = this.shoppingCartService.orderPreview$.pipe(
    tap((x) => console.log(x)),
    catchError((error) => this.handleOrderPreviewError(error))
  );

  private handleOrderPreviewError(error: HttpErrorResponse): Observable<never> {
    const code = error.status;
    const message: string = error.error.errors.message;
    if (
      code == 400 &&
      (message.includes('Could not find') ||
        message.includes("Invalid requested item's quantity"))
    ) {
      alert(
        'Invalid request - clearing basket. Please  complete your shopping cart again.'
      );
      this.router.navigate(['/']);
      this.shoppingCartService.clearBasket();
    }
    return throwError(() => error);
  }
}
