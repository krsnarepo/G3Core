import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/app/environment/env.dev';
import { catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  sendShippingData$(shippingData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/solicitudes/order/`, shippingData, { headers })
      .pipe(
        tap(response => {
          console.log('Shipping data sent successfully: ', response);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

}
