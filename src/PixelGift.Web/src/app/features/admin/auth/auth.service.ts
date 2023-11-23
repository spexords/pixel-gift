import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ReplaySubject, first, tap, map } from 'rxjs';
import { User } from 'src/app/core/models';
import { Login } from 'src/app/core/models/login.interface';
import { API_URL } from 'src/app/core/tokens/api-url.token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSource = new ReplaySubject<User | null>();
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  user$ = this.userSource.asObservable();
  getCurrentUser(): void {
    const token = this.getJwtToken();

    if (!token) {
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    this.http
      .get<User>(`${this.baseUrl}/account`, { headers })
      .pipe(
        first(),
        tap((user) => this.saveJwtToken(user.token))
      )
      .subscribe((user) => this.userSource.next(user));
  }

  login(values: Login): void {
    this.http
      .post<User>(`${this.baseUrl}/account/login`, values)
      .pipe(
        first(),
        tap((user) => {
          this.saveJwtToken(user.token);
        })
      )
      .subscribe((user) => this.userSource.next(user));
  }

  logout(): void {
    this.userSource.next(null);
    this.deleteJwtToken();
    this.userSource.next(null);
    this.userSource.next(null);
  }

  isLoggedIn(): boolean {
    let loggedIn = false;
    this.user$
      .pipe(
        first(),
        map((user) => !!user)
      )
      .subscribe((res) => (loggedIn = res));
    return loggedIn;
  }

  private deleteJwtToken(): void {
    window.localStorage.removeItem('jwt');
  }

  private saveJwtToken(token: string): void {
    window.localStorage.setItem('jwt', token);
  }

  private getJwtToken(): string | null {
    return window.localStorage.getItem('jwt');
  }
}
