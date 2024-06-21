import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../../environments/env.dev';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/token/`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem(ACCESS_TOKEN, response.access);
          localStorage.setItem(REFRESH_TOKEN, response.refresh);
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      return throwError('No refresh token found');
    }

    return this.http.post<any>(`${this.apiUrl}/login/token/refresh/`, { refresh: refreshToken })
      .pipe(
        tap(response => {
          localStorage.setItem(ACCESS_TOKEN, response.access);
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      return false;
    }
  
    const decodedToken = jwtDecode(token);
    const tokenExpiration = decodedToken?.exp ?? undefined; // Add null check for decodedToken and provide a default value
    const now = Date.now() / 1000;
  
    return tokenExpiration !== undefined && tokenExpiration >= now; // Add undefined check for tokenExpiration
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/login/user/all/`).pipe(
      catchError(error => {
        throw error;
      })
    );
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    this.router.navigate(['/login/']);
  }

}
