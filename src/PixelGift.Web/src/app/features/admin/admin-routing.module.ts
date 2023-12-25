import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CategoriesComponent } from './admin-panel/features/categories/categories.component';
import { ItemsComponent } from './admin-panel/features/items/items.component';
import { authGuard } from './auth/auth.guard';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}