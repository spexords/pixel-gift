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
import { Appearance, loadStripe } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
    loadStripe(environment.stripePk).then((stripe) => {
      if (stripe === null) {
        alert('Could not create stripe');
      }

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

          if (elements) {
            const paymentElement = elements.create('payment');
            paymentElement.mount(this.payment?.nativeElement);
          }
        });
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



// // Assuming 'stripe' is your Stripe.js instance
// const elements = stripe?.elements({
//   clientSecret: orderPaymentIntent.clientSecret,
//   appearance,
// });

// if (elements) {
//   const paymentElement = elements.create('payment');
//   paymentElement.mount(this.payment?.nativeElement);

//   // Handle form submission or any other trigger event
//   const form = document.getElementById('your-payment-form-id'); // Replace with your actual form ID
//   form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     // Confirm the payment
//     const { paymentIntent, error } = await stripe.confirmPayment({
//       element: paymentElement,
//       confirmParams: {
//         // Additional confirmation parameters if needed
//       },
//     });

//     if (error) {
//       console.error(error);
//       // Handle payment confirmation error
//     } else if (paymentIntent.status === 'succeeded') {
//       // Payment succeeded
//       console.log('Payment succeeded:', paymentIntent);
//     } else if (paymentIntent.status === 'requires_action') {
//       // Additional action required, e.g., 3D Secure authentication
//       const { error: actionError } = await stripe.handleCardAction(
//         paymentIntent.payment_method
//       );

//       if (actionError) {
//         console.error(actionError);
//         // Handle card action error
//       } else {
//         // After handling the action, confirm the payment again
//         const confirmedPayment = await stripe.confirmPayment({
//           element: paymentElement,
//           confirmParams: {
//             payment_method: paymentIntent.payment_method,
//           },
//         });

//         if (confirmedPayment.error) {
//           console.error(confirmedPayment.error);
//           // Handle confirmed payment error
//         } else if (confirmedPayment.paymentIntent.status === 'succeeded') {
//           // Payment succeeded after handling the action
//           console.log('Payment succeeded:', confirmedPayment.paymentIntent);
//         }
//       }
//     }
//   });
// }