import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CategoriesComponent } from './admin-panel/features/categories/categories.component';
import { ItemsComponent } from './admin-panel/features/items/items.component';
import { authGuard } from './auth/auth.guard';
import { PromoCodesComponent } from './admin-panel/features/promo-codes/promo-codes.component';
import { AccountComponent } from './admin-panel/features/account/account.component';
import { OrdersComponent } from './admin-panel/features/orders/orders.component';
import { importProvidersFrom } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthEffects, authReducer } from './auth/state';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminEffects, adminReducer } from './admin-panel/state';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    providers: [
      importProvidersFrom(
        StoreModule.forFeature('admin', adminReducer),
        EffectsModule.forFeature([AdminEffects]),
      ),
    ],
    children: [
      {
        path: 'auth',
        component: AuthComponent,
      },
      {
        path: '',
        component: AdminPanelComponent,
        canActivate: [authGuard],
        providers: [importProvidersFrom(MatDialogModule)],
        children: [
          { path: 'categories', component: CategoriesComponent },
          { path: 'items', component: ItemsComponent },
          { path: 'promo-codes', component: PromoCodesComponent },
          { path: 'orders', component: OrdersComponent },
          { path: 'account', component: AccountComponent },
        ],
      },
    ],
  },
];
