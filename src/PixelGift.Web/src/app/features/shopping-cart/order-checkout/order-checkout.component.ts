import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@ngneat/transloco';
import { BreadcrumbService } from 'xng-breadcrumb';
import { combineLatest } from 'rxjs';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { ShoppingCartService } from '../shopping-cart.service';
import { loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [CommonModule, OrderSummaryComponent],
  templateUrl: './order-checkout.component.html',
  styleUrl: './order-checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCheckoutComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private breadcrumbService = inject(BreadcrumbService);
  private translocoService = inject(TranslocoService);
  private shoppingCartService = inject(ShoppingCartService);

  orderPreview$ = this.shoppingCartService.orderPreview$;

  @ViewChild('payment') payment?: ElementRef;

  ngOnInit(): void {
    this.initStripe();
    this.updateBreadcrumb();
  }

  initStripe(): void {
    loadStripe(
      environment.stripePk
    ).then((stripe) => {
      if (stripe === null) {
        alert('Could not create stripe');
      }

      console.log(stripe);
      const elements = stripe?.elements();
      if (elements) {
        console.log(elements);
        const paymentElement = elements.create('payment');
        paymentElement.mount(this.payment?.nativeElement);
      }
    });
  }

  private updateBreadcrumb(): void {
    combineLatest([
      this.translocoService.selectTranslate('shopping-cart.bc1'),
      this.translocoService.selectTranslate('shopping-cart.bc2'),
    ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(([bc1, bc2]) => {
        this.breadcrumbService.set('@shopping-cart', bc1);
        this.breadcrumbService.set('@checkout', bc2);
      });
  }
}
