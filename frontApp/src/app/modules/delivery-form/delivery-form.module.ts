import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeliveryFormRoutingModule } from './delivery-form-routing.module';
import { DeliveryFormPageComponent } from './delivery-form-page/delivery-form-page.component';


@NgModule({
  declarations: [
    DeliveryFormPageComponent
  ],
  imports: [
    CommonModule,
    DeliveryFormRoutingModule,
    SharedModule
  ]
})
export class DeliveryFormModule { }
