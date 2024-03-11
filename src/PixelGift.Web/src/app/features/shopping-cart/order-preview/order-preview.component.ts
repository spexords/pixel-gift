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
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { ShoppingCartActions, ShoppingCartSelectors } from '../state';
import { isEqual } from 'lodash';
import { Router } from '@angular/router';
import { SHOPPING_CART_PATH } from 'src/app/app.routes';
import { ScrollService } from 'src/app/core/services/scroll.service';

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
  private store = inject(Store);
  private subscription: Subscription | null = null;
  private router = inject(Router);

  private destroyRef = inject(DestroyRef);
  private orderPreviewFormService = inject(OrderPreviewFormService);
  private breadcrumbService = inject(BreadcrumbService);
  private translocoService = inject(TranslocoService);
  private scrollService = inject(ScrollService);
  private cdr = inject(ChangeDetectorRef);
  private orderForm: FormGroup | null = null;

  orderPreview$ = this.store.select(ShoppingCartSelectors.selectOrderPreview);

  orderForm$ = this.orderPreviewFormService.form$.pipe(
    tap((form) => this.handleFormValueChanges(form)),
  );

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.updateBreadcrumb();
    this.store.dispatch(ShoppingCartActions.getOrderPreview());
  }

  onSummaryClick(): void {
    this.orderForm?.markAllAsTouched();
    this.cdr.detectChanges();

    if (this.orderForm?.invalid) {
      this.scrollService.moveToErrors();
    } else {
      this.store.dispatch(ShoppingCartActions.setOrderFormFullfiled());
      this.router.navigate([SHOPPING_CART_PATH, 'checkout']);
    }
  }

  private updateBreadcrumb(): void {
    this.translocoService
      .selectTranslate('shopping-cart.bc1')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) =>
        this.breadcrumbService.set('@shopping-cart', value),
      );
  }

  private handleFormValueChanges(form: FormGroup): void {
    if (this.subscription !== null) {
      this.subscription.unsubscribe();
    }
    this.orderForm = form;

    this.subscription = form.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(300),
        distinctUntilChanged(isEqual),
      )
      .subscribe((values) =>
        this.store.dispatch(
          ShoppingCartActions.updateOrderPreviewData({ data: values }),
        ),
      );
  }
}
