import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/env.dev';

@Injectable({
  providedIn: 'root'
})
export class ConfirmPayService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  confirmPayment(paymentCode: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/solicitudes/confirm/${paymentCode}/`, paymentCode);
  }

  getReceipt(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/solicitudes/receipt/${orderId}/`);
  }

}
