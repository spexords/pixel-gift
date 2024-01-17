import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryOrderItemComponent } from './category-order-item/category-order-item.component';
import { ShoppingCartService } from '../shopping-cart.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { BreadcrumbService } from 'xng-breadcrumb';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-order-preview',
  standalone: true,
  imports: [
    CommonModule,
    CategoryOrderItemComponent,
    OrderSummaryComponent,
    TranslocoPipe,
  ],
  templateUrl: './order-preview.component.html',
  styleUrl: './order-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderPreviewComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private shoppingCartService = inject(ShoppingCartService);
  private breadcrumbService = inject(BreadcrumbService);
  private translocoService = inject(TranslocoService);

  orderPreview$ = this.shoppingCartService.orderPreview$.pipe(
    catchError((error) => this.handleOrderPreviewError(error))
  );

  ngOnInit(): void {
    this.translocoService
      .selectTranslate('shopping-cart.bc1')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) =>
        this.breadcrumbService.set('@shopping-cart', value)
      );
  }

  onSummaryClick(): void {
    this.shoppingCartService.tryMoveToCheckout();
  }

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
