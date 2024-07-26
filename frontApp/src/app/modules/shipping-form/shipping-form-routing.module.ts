import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingFormPageComponent } from './shipping-form-page/shipping-form-page.component';

const routes: Routes = [
  {path:"",
    component:ShippingFormPageComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShippingFormRoutingModule { }
