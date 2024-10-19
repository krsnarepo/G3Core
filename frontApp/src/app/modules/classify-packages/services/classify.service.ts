import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/app/environment/env.dev';

@Injectable({
  providedIn: 'root'
})
export class ClassifyService {

  private baseUrl = environment.apiUrl;
  // private httpOptions = {
  //   headers: new HttpHeaders ({
  //     'Content-Type': 'application/json'
  //   }),
  //   withCredentials: true
  // };

  constructor(private http: HttpClient) { }

  getPackages$(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/paquetes/get-package/`).pipe(
      tap(response => {
        console.log('Obtained packages in sesion: ', response);
      }),
      catchError(error => {
          return throwError(error);
      })
    );;
  }

  updatePackage$(code: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/paquetes/${code}/update/`, data);
  }
}
