import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStateServiceService } from '../../payment/services/order-state-service.service';
import { ConfirmPayService } from '../../payment/services/confirm-pay.service';

@Component({
  selector: 'app-generate-receipt-page',
  templateUrl: './generate-receipt-page.component.html',
  styleUrls: ['./generate-receipt-page.component.css']
})
export class GenerateReceiptPageComponent {
  datos: any[] = [];
  orderData: any;
  receipt: any;

  constructor(
    private router: Router,
    private orderStateService: OrderStateServiceService,
    private paymentConfirmationService: ConfirmPayService
  ) {}

  ngOnInit() {
    this.orderData = this.orderStateService.getOrderData();
    if (!this.orderData || !this.orderData.paymentConfirmation) {
      this.router.navigate(['/forms']);
      return;
    }
    this.getReceipt();
  }

  getReceipt() {
    console.log('Getting receipt:', this.orderData.paymentConfirmation.num_comprobante);
    this.paymentConfirmationService.getReceipt(this.orderData.paymentConfirmation.num_comprobante).subscribe({
      next: (response) => {
        this.datos = this.orderStateService.getPackageData();
        console.log('Datos de paquetes en GENERAR',this.datos)
        this.receipt = response;
        console.log('Receipt retrieved:', this.receipt);
      },
      error: (error) => {
        console.error('Error getting receipt:', error);
        alert('Hubo un error al obtener el comprobante. Por favor, intente de nuevo más tarde.');
      }
    });
  }

  finishOrder() {
    this.orderStateService.clearOrderData();
    this.router.navigate(['/forms']);
  }

}
