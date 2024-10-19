import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OrderStateServiceService } from '../services/order-state-service.service';

export const paymentGuard: CanActivateFn = (route, state) => {
  const paymentService = inject(OrderStateServiceService);
  const router = inject(Router);

  const orderData = paymentService.getOrderData();
  console.log('PaymentGuard: Order data retrieved ', orderData);

  if (orderData && orderData.num_pedido && orderData.total_price && orderData.list_price) {
    return true;
  } else {
    console.log('PaymentGuard: Redirecting to shipping');
    return router.createUrlTree(['/forms']);
  }
};
