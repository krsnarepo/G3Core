import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/env.dev';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { ACCESS_TOKEN } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})
export class UpdateDocumentService {

  private readonly apiUrl = environment.apiUrl
  token = localStorage.getItem(ACCESS_TOKEN);

  constructor(private http: HttpClient) { 

  }

  updateDocument(documentId: string, document: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/paquetes/list-doc/`, document)
      .pipe(
        tap(response => {
          console.log('Document obtained: ', response);
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  getDocument$(documentId: string): Observable<any> {

    // const options = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${this.token}`
    //   })
    // };
  
    return this.http.get<any>(`${this.apiUrl}/paquetes/list-doc/`)
      .pipe(
        tap(response => {
          console.log('Document obtained: ', response);
        }),
        catchError(error => {
          return throwError(error);
        })
      );
  }

}
