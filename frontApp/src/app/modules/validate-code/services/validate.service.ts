import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  private baseUrl = 'http://127.0.0.1:8000/paquetes';

  constructor(private http: HttpClient) { }

  validateCode$(code: string): Observable<any> {
    // Ajusta el nombre del campo del código según el backend
    return this.http.post<any>(`${this.baseUrl}/validate-code/`, { codigo_paquete: code });
  }
}
