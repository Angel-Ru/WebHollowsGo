import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonatgeService {
  private apiUrl = 'https://hollowsgo-production.up.railway.app';

  constructor(private http: HttpClient) {}

  getPersonatgesAmbSkins(userId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}/skins/biblioteca/${userId}`, { headers });
  }
}
