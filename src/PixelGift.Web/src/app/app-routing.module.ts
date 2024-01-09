import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin-routing.module').then(
        (mod) => mod.AdminRoutingModule
      ),
  },
  {
    path: 'shopping-cart',
    loadChildren: () =>
      import('./features/shopping-cart/shopping-cart.module').then(
        (mod) => mod.ShoppingCartModule
      ),
    data: { breadcrumb: 'Shopping Cart' },
  },
  { path: '', component: HomeComponent, data: { breadcrumb: 'Home' } },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
