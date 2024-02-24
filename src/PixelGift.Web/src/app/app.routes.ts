import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'shopping-cart',
    loadChildren: () =>
      import('./features/shopping-cart/shopping-cart.routes').then(
        (m) => m.SHOPPING_CART_ROUTES
      ),
  },
  { path: '**', redirectTo: '' },
];
