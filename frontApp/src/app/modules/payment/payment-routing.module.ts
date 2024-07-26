import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { ConfirmPayService } from './services/confirm-pay.service';
import { OrderStateServiceService } from './services/order-state-service.service';

const routes: Routes = [ 
{ path: '', component: PaymentPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
