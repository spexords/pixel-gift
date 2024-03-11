import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../auth/state';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private store = inject(Store);
  private router = inject(Router);

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    this.router.navigateByUrl('/');
  }
}
