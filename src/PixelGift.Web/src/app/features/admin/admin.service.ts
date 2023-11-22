import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models';
import { API_URL } from 'src/app/core/tokens/api-url.token';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);

  getCategories(): Observable<Category[]>
  {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }

}
