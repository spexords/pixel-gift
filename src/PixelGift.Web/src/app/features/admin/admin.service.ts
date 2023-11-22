import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_URL } from 'src/app/core/tokens/api-url.token';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private http = inject(HttpClient);
  private baseUrl = inject(API_URL);
}
