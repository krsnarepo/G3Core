import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environment/env.dev';

@Injectable({
  providedIn: 'root'
})
export class OrderStateServiceService {

  private orderData: any = null;
  private packageData: any = null;
  private readonly apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  setOrderData(data: any) {
    this.orderData = data;
    console.log('Order data set:', this.orderData);
  }

  setPackageData(data: any) {
    this.packageData = data;
    console.log('Package data set:', this.packageData);
  }

  getOrderData() {
    console.log('Order data retrieved:', this.orderData);
    return this.orderData;
  }

  getPackageData() {
    console.log('Package data retrieved:', this.packageData);
    return this.packageData;
  }

  clearOrderData() {
    this.orderData = null;
    this.packageData = null;
  }

  getDatos(data: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/solicitudes/paquetes-por-comprobante/${data}/`);
  }

}
