import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/app/environment/env.dev';

@Injectable({
  providedIn: 'root'
})
export class GenerateDocumentService {

  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  generateDocument$(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/paquetes/create-doc/`, data).pipe(
      tap(response => {
        console.log('Document generated: ', response);
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

}
