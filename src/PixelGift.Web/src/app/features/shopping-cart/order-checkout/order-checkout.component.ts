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
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';
import { BreadcrumbService } from 'xng-breadcrumb';
import { combineLatest, firstValueFrom } from 'rxjs';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { ShoppingCartService } from '../shopping-cart.service';
import {
  Appearance,
  Stripe,
  StripeElements,
  loadStripe,
} from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderCreated } from 'src/app/core/models/order-created.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-checkout',
  standalone: true,
  imports: [
    CommonModule,
    OrderSummaryComponent,
    ReactiveFormsModule,
    TranslocoPipe,
  ],
  templateUrl: './order-checkout.component.html',
  styleUrl: './order-checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderCheckoutComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private breadcrumbService = inject(BreadcrumbService);
  private translocoService = inject(TranslocoService);
  private router = inject(Router);
  private shoppingCartService = inject(ShoppingCartService);
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;

  emailFormField = new FormControl<string>('', [
    Validators.required,
    Validators.email,
  ]);

  orderPreview$ = this.shoppingCartService.orderPreview$;

  @ViewChild('payment') payment?: ElementRef;

  ngOnInit(): void {
    this.initStripe();
    this.updateBreadcrumb();
  }

  initStripe(): void {
    loadStripe(environment.stripePk).then((stripe) => {
      if (stripe === null) {
        alert('Could not create stripe');
      }

      this.stripe = stripe;

      this.shoppingCartService
        .createOrderPaymentIntent()
        .subscribe((orderPaymentIntent) => {
          const appearance: Appearance = {
            theme: 'night',
            variables: {
              fontFamily: 'Goldman, system-ui, sans-serif',
              fontWeightNormal: '400',
              borderRadius: '12px',
              colorBackground: '#06172c',
              colorPrimary: '#DBA619',
              accessibleColorOnColorPrimary: '#1A1B25',
              colorText: 'white',
              colorTextSecondary: 'white',
              colorTextPlaceholder: '#67707a',
              tabIconColor: 'white',
              logoColor: 'dark',
            },
            rules: {
              '.Input, .Block, .Select': {
                backgroundColor: 'transparent',
                border: '1.5px solid var(--colorPrimary)',
              },
            },
          };

          const elements = stripe?.elements({
            clientSecret: orderPaymentIntent.clientSecret,
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
                : 'Please enter valid payment information.';
            });
          }
        });
    });
  }

  async submitOrder(): Promise<void> {
    try {
      this.emailFormField.markAllAsTouched();
      this.emailFormField.updateValueAndValidity();
      if (!this.emailFormField.valid) {
        alert('Please fill all required fields');
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
          alert('Please enter valid payment information.');
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
    } catch (error: any) {
      if (error instanceof HttpErrorResponse) {
        const code = error.status;
        const message: string = error.error.errors.message;
        if (
          code == 400 &&
          (message.includes('Could not find') ||
            message.includes("Invalid requested item's quantity") ||
            message.includes('Could not create order'))
        ) {
          alert(
            'Could not realize your order - clearing basket. Please complete your shopping cart again.'
          );
          this.router.navigate(['/']);
          this.shoppingCartService.clearBasket();
        } else {
          alert(
            'Failed with order submit. Please contact administrator. You can find contact information on the bottom of the page.'
          );
        }
      }
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

  private async createOrder(): Promise<OrderCreated> {
    return firstValueFrom(
      this.shoppingCartService.createOrder(this.emailFormField.value as string)
    );
  }

  private getValidReturnUrl(orderCreated: OrderCreated): string {
    return `${environment.checkoutSucceededUrl}?orderCustomerId=${orderCreated.orderCustomerId}`;
  }
}
