import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7292/api/Authentication';

  constructor(private http: HttpClient) { }

  register(userId: string, username: string, password: string, email: string): Observable<any> {
   /* const body = { userId, username, password, email };*/
    return this.http.post(`${this.apiUrl}/register`, { userId, username, password, email }, { responseType: 'text' })
      .pipe(
        catchError(this.handleError)
      );
  }

  login(userId: string, password: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, { userId, password }, { responseType: 'text' });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error;
  }
}


