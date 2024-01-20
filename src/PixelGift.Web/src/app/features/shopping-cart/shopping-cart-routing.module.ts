import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';

const routes: Routes = [
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

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
