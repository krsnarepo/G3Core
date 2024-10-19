import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryFormPageComponent } from './delivery-form-page/delivery-form-page.component';

const routes: Routes = [
 {path : '' , component: DeliveryFormPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryFormRoutingModule { }
