import { ShoppingCartComponent } from './shopping-cart.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { orderCheckoutGuard } from './order-checkout/order-checkout.guard';
import { Routes } from '@angular/router';

export const SHOPPING_CART_ROUTES: Routes = [
  {
    path: '',
    component: ShoppingCartComponent,
    data: {
      breadcrumb: {
        alias: 'shopping-cart',
      },
    },
    children: [
      {
        path: 'checkout',
        children: [
          {
            path: 'confirm',
            component: OrderConfirmComponent,
            data: {
              breadcrumb: {
                alias: 'confirm',
              },
            },
          },
          {
            path: '',
            canActivate: [orderCheckoutGuard],
            component: OrderCheckoutComponent,
            data: {
              breadcrumb: {
                alias: 'checkout',
              },
            },
          },
        ],
      },
      {
        path: '',
        component: OrderPreviewComponent,
      },
    ],
  },
];
