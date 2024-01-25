import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CategoriesComponent } from './admin-panel/features/categories/categories.component';
import { ItemsComponent } from './admin-panel/features/items/items.component';
import { authGuard } from './auth/auth.guard';
import { PromoCodesComponent } from './admin-panel/features/promo-codes/promo-codes.component';
import { AccountComponent } from './admin-panel/features/account/account.component';
import { OrdersComponent } from './admin-panel/features/orders/orders.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '',
    component: AdminPanelComponent,
    canActivate: [authGuard],
    children: [
      { path: 'categories', component: CategoriesComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'promo-codes', component: PromoCodesComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'account', component: AccountComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
