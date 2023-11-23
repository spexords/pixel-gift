import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Category, User } from 'src/app/core/models';
import { API_URL } from 'src/app/core/tokens/api-url.token';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private userSource = new ReplaySubject<User | null>();
  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  user$ = this.userSource.asObservable();

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
}
