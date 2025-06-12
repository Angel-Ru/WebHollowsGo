import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://hollowsgo-production.up.railway.app/usuaris/login';

  constructor(private http: HttpClient) {}

  login(email: string, contrassenya: string): Observable<any> {
    const body = { email, contrassenya };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(this.apiUrl, body, { headers });
  }
}
