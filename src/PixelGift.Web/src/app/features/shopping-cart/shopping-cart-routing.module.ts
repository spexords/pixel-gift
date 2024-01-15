import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';
import { OrderPreviewComponent } from './order-preview/order-preview.component';
import { OrderCheckoutComponent } from './order-checkout/order-checkout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'checkout',
        component: OrderCheckoutComponent,
        data: {
          breadcrumb: {
            alias: 'checkout',
          },
        },
      },
      {
        path: '',
        component: OrderPreviewComponent,
      },
    ],
    component: ShoppingCartComponent,
    data: {
      breadcrumb: {
        alias: 'shopping-cart',
      },
    },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
