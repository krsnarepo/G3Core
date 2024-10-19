import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmPayService } from './services/confirm-pay.service';
import { OrderStateServiceService } from './services/order-state-service.service';

const routes: Routes = [
  { path: '', component: PaymentPageComponent }
];

@NgModule({
  declarations: [
    PaymentPageComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers: [
  ]
})
export class PaymentModule { }
