import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from 'src/app/features/admin/auth/models/login.interface';
import { User } from './models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  getCurrentUser(): Observable<User | null> {
    const token = this.getJwtToken();

    if (!token) {
      return of(null);
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<User>('account', { headers });
  }

  login(values: Login): Observable<User> {
    return this.http.post<User>('account/login', values);
  }

  private getJwtToken(): string | null {
    return window.localStorage.getItem('jwt');
  }
}
