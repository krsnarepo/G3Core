import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStateServiceService } from '../services/order-state-service.service';
import { ConfirmPayService } from '../services/confirm-pay.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  orderData: any = null;
  deliveryType: 'agency' | 'home' = 'agency';
  deliveryPrice: number = 0;

  constructor(private router: Router, private orderStateService: OrderStateServiceService, private confirmPay: ConfirmPayService) { }

  ngOnInit(): void {
    console.log('PaymentPageComponent: Initializing');
    this.orderData = this.orderStateService.getOrderData();
    console.log('PaymentPageComponent: Order data retrieved', this.orderData);
    if (!this.orderData) {
      console.log('PaymentPageComponent: Order data is null, redirecting to shipping');
      this.router.navigate(['/forms']);
    }
  }

  updateDeliveryPrice(type: 'agency' | 'home') {
    this.deliveryType = type;
    this.deliveryPrice = type === 'home' ? 9.90 : 0;
  }

  get totalPrice(): number {
    return this.orderData && this.orderData.total_price ? this.orderData.total_price + this.deliveryPrice : 0;
  }

  get numberOfPackages(): number {
    return this.orderData && this.orderData.list_price ? this.orderData.list_price.length : 0;
  }

  get deliveryTypeName(): string {
    return this.deliveryType === 'home' ? 'A domicilio' : 'Agencia';
  }

  onPaymentComplete() {

    if (!this.orderData) {
      console.error('No order data available for payment');
      return;
    }

    const paymentData = {
      orderId: this.orderData.num_pedido,
      amount: this.totalPrice,
      deliveryType: this.deliveryType
      // Añade aquí cualquier otro dato necesario para el pago
    };

    this.confirmPay.confirmPayment(paymentData.orderId).subscribe({
      next: (response) => {
        console.log('Payment confirmed:', response);
        this.orderStateService.setOrderData({
          ...this.orderData,
          paymentConfirmation: response
        });
        this.router.navigate(['/generatereceipt']);
      },
      error: (error) => {
        console.error('Error confirming payment:', error);
        alert('Hubo un error al confirmar el pago. Por favor, intente de nuevo.');
      }
    });

    // this.orderStateService.clearOrderData();
    // this.router.navigate(['/generatereceipt']);
  }

}
