import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/env.dev';
import { BehaviorSubject, map, Observable, switchMap, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_TYPE } from 'src/app/constants';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userTypeSubject: BehaviorSubject<string>;
  public userType$: Observable<string>;
  private readonly apiUrl = environment.apiUrl;
  private csrfToken: string | null = null;

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
    this.userTypeSubject = new BehaviorSubject<string>(localStorage.getItem(USER_TYPE) || '');
    this.userType$ = this.userTypeSubject.asObservable();
  }

  getUserType(): string {
    console.log('User type obtained: ', this.userTypeSubject.value);
    return this.userTypeSubject.value;
  }

  setUserType(type: string) {
    localStorage.setItem(USER_TYPE, type);
    this.userTypeSubject.next(type);
  }

  login(username: string, password: string): Observable<any> {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(USER_TYPE);
    return this.http.post<any>(`${this.apiUrl}/login/token/`, { username, password })
      .pipe(
        tap(response => {
          localStorage.setItem(ACCESS_TOKEN, response.access);
          localStorage.setItem(REFRESH_TOKEN, response.refresh);
        }),
        switchMap(() => {
          return this.getCsrfToken().pipe(
            switchMap(() => this.fetchUserType()),
            catchError(error => throwError(error))
          );
        }),
        // switchMap(() => this.fetchUserTypes()),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getJwtToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getCsrf() {
    return this.csrfToken;
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/user/register/`, { username, password })
      .pipe(
        catchError(error => {
          return throwError(error);
        })
      );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      this.logout();
      return throwError('No refresh token found');
    }

    return this.http.post<any>(`${this.apiUrl}/login/token/refresh/`, { refresh: refreshToken })
      .pipe(
        tap(response => {
          localStorage.setItem(ACCESS_TOKEN, response.access);
        }),
        catchError(error => {
          this.logout();
          throw error;
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

  fetchUserType(): Observable<any> {
    const headers = new HttpHeaders({
      'X-CSRFToken': this.csrfToken || ''
    });
    return this.http.get<any>(`${this.apiUrl}/login/worker/`).pipe(
      map(response => {
        console.log('User type obtained: ', response.worker_type.name);
        this.setUserType(response.worker_type.name);
      }),
      catchError(error => {
        console.error('Error fetching user type:', error);
        return throwError(error);
      })
    );
  }

  // fetchUserTypes(): Observable<any> {
  //   return this.http.get<string[]>(`${this.apiUrl}/login/list-workers/`)
  //     .pipe(
  //       tap(types => {
  //         this.userTypesSubject.next(types);
  //       })
  //     );
  // }

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
    localStorage.removeItem(USER_TYPE);
    this.userTypeSubject.next('');
    this.router.navigate(['/login/']);
  }

}
