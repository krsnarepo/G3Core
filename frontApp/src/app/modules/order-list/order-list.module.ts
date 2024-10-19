import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListPageComponent } from './order-list-page/order-list-page.component';


@NgModule({
  declarations: [
    OrderListPageComponent
  ],
  imports: [
    CommonModule,
    OrderListRoutingModule,
    SharedModule
  ]
})
export class OrderListModule { }
