import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/env.dev';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  validateCode$(code: string): Observable<any> {
    // Ajusta el nombre del campo del código según el backend
    return this.http.post<any>(`${this.baseUrl}/paquetes/validate-code/`, { codigo_paquete: code });
  }
}
