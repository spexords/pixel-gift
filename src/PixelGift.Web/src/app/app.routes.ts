import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const HOME_PATH = '';
export const ADMIN_PATH = 'admin';
export const SHOPPING_CART_PATH = 'shopping-cart';

export const APP_ROUTES: Routes = [
  {
    path: HOME_PATH,
    pathMatch: 'full',
    component: HomeComponent,
    data: { breadcrumb: 'Home' },
  },
  {
    path: ADMIN_PATH,
    loadChildren: () =>
      import('./features/admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: SHOPPING_CART_PATH,
    loadChildren: () =>
      import('./features/shopping-cart/shopping-cart.routes').then(
        (m) => m.SHOPPING_CART_ROUTES,
      ),
  },
  { path: '**', redirectTo: '' },
];