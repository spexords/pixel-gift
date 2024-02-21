import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryOrderItemComponent } from './category-order-item/category-order-item.component';
import { ShoppingCartService } from '../shopping-cart.service';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { BreadcrumbService } from 'xng-breadcrumb';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrderPreviewFormService } from './order-preview-form.service';
import { LetDirective } from '@ngrx/component';
import { FormGroup } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'app-order-preview',
  standalone: true,
  imports: [
    CommonModule,
    CategoryOrderItemComponent,
    OrderSummaryComponent,
    TranslocoPipe,
    LetDirective,
  ],
  templateUrl: './order-preview.component.html',
  styleUrl: './order-preview.component.scss',
})
export class OrderPreviewComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private shoppingCartService = inject(ShoppingCartService);
  private orderPreviewFormService = inject(OrderPreviewFormService);
  private breadcrumbService = inject(BreadcrumbService);
  private translocoService = inject(TranslocoService);
  private cdr = inject(ChangeDetectorRef);
  private orderForm: FormGroup | null = null;

  orderPreview$ = this.shoppingCartService.orderPreview$;
  orderForm$ = this.orderPreviewFormService.formChanged$.pipe(
    tap((form) => (this.orderForm = form))
  );

  ngOnInit(): void {
    this.updateBreadcrumb();
    window.scrollTo(0, 0);
  }

  private updateBreadcrumb(): void {
    this.translocoService
      .selectTranslate('shopping-cart.bc1')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) =>
        this.breadcrumbService.set('@shopping-cart', value)
      );
  }

  onPromoCodeChange(categoryId: string, promoCode: string): void {
    this.shoppingCartService.updatePromoCodes(categoryId, promoCode);
  }

  onSummaryClick(): void {
    this.orderForm?.markAllAsTouched();
    this.cdr.detectChanges();
    this.shoppingCartService.tryMoveToCheckout(this.orderForm as FormGroup);
  }
}
