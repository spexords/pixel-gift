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
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

