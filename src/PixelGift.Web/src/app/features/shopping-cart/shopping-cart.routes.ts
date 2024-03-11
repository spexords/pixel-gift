import { ShoppingCartComponent } from './shopping-cart.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { orderCheckoutGuard } from './order-checkout/order-checkout.guard';
import { Routes } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingCartEffects, shoppingCartReduer } from './state';
import { ShoppingCartClearService } from './shopping-cart-clear.service';
import { ShoppingCartService } from './shopping-cart.service';

export const SHOPPING_CART_ROUTES: Routes = [
  {
    path: '',
    component: ShoppingCartComponent,
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('shoppingCart', shoppingCartReduer),
        EffectsModule.forFeature([ShoppingCartEffects]),
      ),
      ShoppingCartClearService,
    ],
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
