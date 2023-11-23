import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin-panel/admin-panel.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Login } from 'src/app/core/models/login.interface';
import { filter, first } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.authService.getCurrentUser();
    this.authService.user$
      .pipe(
        filter((user) => !!user),
        first()
      )
      .subscribe(() => {
        this.router.navigateByUrl('/admin');
      });
  }

  onSubmit(): void {
    const values = this.form.value as Login;
    this.authService.login(values);
  }
}
