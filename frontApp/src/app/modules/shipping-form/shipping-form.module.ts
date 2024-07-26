import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShippingFormRoutingModule } from './shipping-form-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ShippingFormPageComponent } from './shipping-form-page/shipping-form-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: ShippingFormPageComponent }
];

@NgModule({
  declarations: [ShippingFormPageComponent],
  imports: [
    CommonModule,
    ShippingFormRoutingModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ShippingFormModule { }
