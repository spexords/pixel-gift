import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { BreadcrumbService } from 'xng-breadcrumb';
import { combineLatest, first, firstValueFrom } from 'rxjs';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { Stripe, StripeElements, loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderCreated } from 'src/app/features/shopping-cart/models/order-created.interface';
import { LetDirective } from '@ngrx/component';
import { TextInputComponent } from 'src/app/shared/components/text-input/text-input.component';
import { Store } from '@ngrx/store';
import { ShoppingCartActions, ShoppingCartSelectors } from '../state';
import { appearance } from './stripe-appearance.const';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [
    CommonModule,
    OrderSummaryComponent,
    ReactiveFormsModule,
    TranslocoPipe,
    LetDirective,
    TextInputComponent,
  ],
  templateUrl: './order-checkout.component.html',
  styleUrl: './order-checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCheckoutComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);
  private breadcrumbService = inject(BreadcrumbService);
  private translocoService = inject(TranslocoService);
  private scrollService = inject(ScrollService)
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;

  emailFormField = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);

  orderPreview$ = this.store.select(ShoppingCartSelectors.selectOrderPreview);

  @ViewChild('payment') payment?: ElementRef;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.updateBreadcrumb();
    this.initStripe();
  }

  initStripe(): void {
    loadStripe(environment.stripePk).then((stripe) => {
      if (stripe === null) {
        alert('Could not create stripe');
      }

      this.stripe = stripe;
      this.store.dispatch(ShoppingCartActions.getOrderPaymentIntent());
      this.store
        .select(ShoppingCartSelectors.selectOrderPaymentIntent)
        .pipe(first((orderPaymentIntent) => !!orderPaymentIntent))
        .subscribe((orderPaymentIntent) => {
          const elements = stripe!.elements({
            clientSecret: orderPaymentIntent!.clientSecret,
            appearance,
          });

          this.elements = elements as StripeElements;

          if (elements) {
            const paymentElement = elements.create('payment');
            paymentElement.mount(this.payment?.nativeElement);

            paymentElement.on('change', (event) => {
              const errorElement = document.getElementById('payment-errors');

              if (errorElement == null) {
                return;
              }

              errorElement.textContent = event.complete
                ? ''
                : this.translocoService.getActiveLang() === 'en'
                  ? 'Please enter valid payment information'
                  : 'Proszę podać prawidłowe dane do płatności';
            });
          }
        });
    });
  }

  async submitOrder(): Promise<void> {
    try {
      this.emailFormField.markAllAsTouched();
      this.cdr.detectChanges();

      if (this.emailFormField.invalid) {
        this.scrollService.moveToErrors();
        return;
      }

      if (this.stripe == null || this.elements == null) {
        alert('Failed to connect with Stripe payment gate');
        return;
      }

      const payment = this.stripe.elements().getElement('payment');

      if (payment) {
        const errorElement = document.getElementById('payment-errors');
        if (errorElement) {
          alert(
            this.translocoService.getActiveLang() === 'en'
              ? 'Please enter valid payment information'
              : 'Proszę podać prawidłowe dane do płatności',
          );
          return;
        }
      }

      const order = await this.createOrder();

      const stripeResult = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: this.getValidReturnUrl(order),
        },
      });

      if (stripeResult.error) {
        alert(stripeResult.error.message);
      }
    } catch (error) {
      alert(
        this.translocoService.getActiveLang() === 'en'
          ? 'Failed with order submit. Please contact administrator. You can find contact information on the bottom of the page.'
          : 'Nie udało się przesłać zamówienia. Skontaktuj się z administratorem. Dane kontaktowe znajdziesz na dole strony.',
      );
    }
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

  private createOrder(): Promise<OrderCreated> {
    this.store.dispatch(
      ShoppingCartActions.createOrder({
        email: this.emailFormField.value as string,
      }),
    );

    return firstValueFrom(
      this.store
        .select(ShoppingCartSelectors.selectOrderCreated)
        .pipe(first((orderCreated) => !!orderCreated)),
    );
  }

  private getValidReturnUrl(orderCreated: OrderCreated): string {
    return `${window.location.href}/confirm?orderCustomerId=${orderCreated.orderCustomerId}`;
  }
}
