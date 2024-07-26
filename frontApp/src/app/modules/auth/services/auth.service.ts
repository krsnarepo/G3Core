import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/env.dev';
import { Observable, switchMap, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/app/constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userType: String;
  private readonly apiUrl = environment.apiUrl
  private csrfToken: string | null = null;


  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.userType = 'cliente';
  }

  getUserType(): String {
    return this.userType;
  }

  setUserType(type: String) {
    this.userType = type;
  }

  login(username: string, password: string): Observable<any> {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    return this.http.post<any>(`${this.apiUrl}/login/token/`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem(ACCESS_TOKEN, response.access);
          localStorage.setItem(REFRESH_TOKEN, response.refresh);
        }),
        switchMap(() => {
          return this.getCsrfToken().pipe(
            switchMap(() => this.getUserType1()),
            catchError(error => throwError(error))
          );
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

  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/login-auth/login/`, { responseType: 'text' })
      .pipe(
        tap(() => {
          this.csrfToken = this.cookieService.get('csrftoken');
          const sessionID = this.cookieService.get('sessionid');
          console.log('CSRF token obtained: ', this.csrfToken); 
          console.log('Session ID obtained: ', sessionID);
        }),
        catchError(error => throwError(error))
      );
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  getUserType1(): Observable<any> {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.http.get<any>(`${this.apiUrl}/login/worker/`).pipe(
      tap(response => {
        console.log('User type obtained: ', response);
        if (response.worker_type.name === 'Cliente') {
          this.setUserType("cliente");
        } else {
          this.setUserType("trabajador");
        }
      }),
      catchError(error => {
        throw error;
      })
    );
  }

  getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'X-CSRFToken': this.csrfToken || ''
      }),
      withCredentials: true
    };
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
