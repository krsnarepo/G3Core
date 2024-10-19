import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/env.dev';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  private apiUrl = environment.apiUrl // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  getPriceList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes/price_table/create`);
  }

  createPrice(priceData: any): Observable<any> {
    console.log(priceData);
    return this.http.post(`${this.apiUrl}/solicitudes/price_table/create/`, priceData);
  }

  updatePrice(codigo: any, priceData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/solicitudes/price_table/${codigo}/`, priceData);
  }

  deletePrice(codigo: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/solicitudes/price_table/${codigo}/delete`);
  }
}
