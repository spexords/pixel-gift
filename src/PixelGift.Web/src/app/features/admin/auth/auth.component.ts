import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { filter } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors } from './state';
import { isNull } from 'lodash';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ADMIN_PATH } from 'src/app/app.routes';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private store = inject(Store);
  private router = inject(Router);

  form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
    this.store.dispatch(AuthActions.getCurrentUser());

    this.store
      .select(AuthSelectors.selectUser)
      .pipe(
        filter((user) => !isNull(user)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.router.navigate(['/', ADMIN_PATH], { replaceUrl: true });
      });
  }

  onSubmit(): void {
    const { username, password } = this.form.value;
    if (username && password) {
      this.store.dispatch(AuthActions.login({ username, password }));
    }
  }
}
