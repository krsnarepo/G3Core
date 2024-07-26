import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassifyService {

  private baseUrl = 'http://127.0.0.1:8000/paquetes';
  // private httpOptions = {
  //   headers: new HttpHeaders ({
  //     'Content-Type': 'application/json'
  //   }),
  //   withCredentials: true
  // };

  constructor(private http: HttpClient) { }

  getPackages$(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/get-package/`).pipe(
      tap(response => {
        console.log('Shipping data sent successfully: ', response);
      }),
      catchError(error => {
          return throwError(error);
        })
    );;
  }

  updatePackage$(code: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${code}/update/`, data);
  }
}
